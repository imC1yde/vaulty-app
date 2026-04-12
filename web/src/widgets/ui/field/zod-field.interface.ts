import type { FieldError } from 'react-hook-form'

export interface IZodField {
  error?: FieldError
  registry?: any
}