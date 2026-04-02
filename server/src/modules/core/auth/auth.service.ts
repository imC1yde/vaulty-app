import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from "@nestjs/jwt"
import { User } from "@src/common/types/user.type"
import type { Nullable } from '@src/common/utilities/nullable.util'
import { TOKEN_NAME, TOKEN_OPTIONS } from '@src/modules/core/auth/cookie.data'
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

  // Checks email and password with stored ones
  // @Returns: true if hashes are similar
  private async authenticate(user: UserForAuth, password: string): Promise<boolean> {
    return await verify(user.password, password)
  }

  // Takes input with optional username, email and password
  // @Returns: A registered user
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

  // Authorize users by email and password.
  // Set token into HttpOnly cookie
  // @Returns: An authorized user
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

    res.cookie(TOKEN_NAME, token, {
      ...TOKEN_OPTIONS,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    })

    return user
  }

  // Log out a user by clear its cookie
  // @Returns: true if success
  public async signOut(res: Response): Promise<boolean> {
    res.clearCookie(TOKEN_NAME, TOKEN_OPTIONS)

    return true
  }
}
