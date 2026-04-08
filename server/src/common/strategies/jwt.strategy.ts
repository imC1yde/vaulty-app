import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { TOKEN_NAME } from '@src/modules/core/auth/cookie.data'
import { JwtConfig } from '@src/modules/infrastructure/config/jwt.config'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtConfig: JwtConfig
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null
        if (req && req.cookies) {
          token = req.cookies[TOKEN_NAME]
        }
        return token
      },
      ignoreExpiration: false,
      secretOrKey: jwtConfig.jwtSecret
    })
  }

  async validate(payload: any): Promise<IUserPayload> {
    if (!payload.sub) throw new UnauthorizedException('[Log]:[JwtStrategy] No token provided [Error]')
    return { sub: payload.sub }
  }
}