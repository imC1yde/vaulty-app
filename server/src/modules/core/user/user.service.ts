import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@src/common/types/user.type'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { UserForAuth } from '@src/modules/core/types/user-for-auth.type'
import { CreateUserInput } from '@src/modules/core/user/inputs/create-user.input'
import { DeleteUserInput } from '@src/modules/core/user/inputs/delete-user.input'
import { GetUserInput } from '@src/modules/core/user/inputs/get-user.input'
import { UpdateUserInput } from '@src/modules/core/user/inputs/update-user.input'
import { PrismaProvider } from "@src/modules/infrastructure/prisma/prisma.provider"
import { RedisService } from '@src/modules/infrastructure/redis/redis.service'
import { verify } from 'argon2'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaProvider,
    private readonly redis: RedisService
  ) {}

  public async getForAuth(email: string): Promise<Nullable<UserForAuth>> {
    const user = await this.getByEmail({ email: email })
    if (!user) throw new NotFoundException('User does not exist')

    const password = (await this.getUserPassword(user.id))!

    return {
      ...user,
      password
    }
  }

  public async getByEmail(input: GetUserInput): Promise<Nullable<User>> {
    return await this.redis.wrap<Nullable<User>>(
      RedisService.Keys.USER.SINGLE(input.email),
      async () => {
        const { email } = input

        const user = await this.prisma.user.findUnique({
          where: {
            email: email
          },
          select: {
            id: true,
            email: true,
            username: true
          }
        })

        return user
      }
    )
  }

  public async create(input: CreateUserInput): Promise<User> {
    const { email, hashed } = input

    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashed
      },
      select: {
        id: true,
        email: true,
        username: true
      }
    })

    return user
  }

  // Updates only username and profile image. \
  // Email cannot be changed after registration
  public async update(id: string, input: UpdateUserInput): Promise<User> {
    const { username } = input

    try {
      const user = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          username: username
        },
        select: {
          id: true,
          email: true,
          username: true
        }
      })

      await this.redis.delete(RedisService.Keys.USER.SINGLE(id))

      return user
    } catch (error) {
      throw new NotFoundException(`User not found`)
    }
  }

  public async delete(id: string, input: DeleteUserInput): Promise<User> {
    const hashed = await this.getUserPassword(id)
    if (!hashed) throw new NotFoundException(`User not found`)

    const isValid = await verify(hashed, input.password)
    if (!isValid) throw new ForbiddenException('Access Denied. Passwords does not match')

    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id
        },
        select: {
          id: true,
          email: true,
          username: true
        }
      })

      await this.redis.delete(RedisService.Keys.USER.SINGLE(id))

      return user
    } catch (error) {
      throw new NotFoundException(`User not found`)
    }
  }

  private async getUserPassword(id: string): Promise<Nullable<string>> {
    const data = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        password: true
      }
    })

    return data?.password ?? null
  }
}
