import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email('Неверный формат email'),
  password: z
    .string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .max(32, 'Слишком длинный пароль')
})

export type SignInSchema = z.infer<typeof signInSchema>