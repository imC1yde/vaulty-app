import type { CookieOptions } from 'express'

export const TOKEN_NAME: string = 'authorization-token'

export const TOKEN_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/'
}