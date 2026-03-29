import type { Nullable } from '@app/common'
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from "@nestjs/jwt"
import { User } from "@src/common/types/user.type"
import { AuthorizeUserInput } from "@src/modules/core/auth/inputs/authorize-user.input"
import { RegisterUserInput } from "@src/modules/core/auth/inputs/register-user.input"
import { UserForAuth } from '@src/modules/core/types/user-for-auth.type'
import { UserService } from "@src/modules/core/user/user.service"
import { AppConfig } from '@src/modules/infrastructure/config/app.config'
import { hash, verify } from 'argon2'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly appConfig: AppConfig
  ) {}

  // check email and password with stored data
  private async authenticate(user: UserForAuth, password: string): Promise<boolean> {
    return await verify(user.password, password)
  }

  // takes input with optional username, email and password
  public async register(input: RegisterUserInput): Promise<Nullable<User>> {
    const { email, password } = input

    const hashed = await hash(password)

    try {
      const user = await this.userService.create({
        email,
        hashed
      })

      return user
    } catch (error) {
      throw new ConflictException('User already exists')
    }
  }

  // authorize users by email and password
  public async authorize(input: AuthorizeUserInput, res: Response): Promise<Nullable<User>> {
    const { email, password } = input

    const user = await this.userService.getForAuth(email)
    if (!user) throw new UnauthorizedException("Invalid email or password")

    const isAuthentified = await this.authenticate(user, password)
    if (!isAuthentified) throw new UnauthorizedException("Invalid email or password")

    const token = await this.jwtService.signAsync({
      sub: user.id,
      iss: this.appConfig.webUrl,
      aud: this.appConfig.webUrl
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      path: '/'
    })

    return user
  }
}
