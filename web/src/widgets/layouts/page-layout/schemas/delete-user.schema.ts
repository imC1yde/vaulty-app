import { z } from 'zod'

export const deleteUserSchema = z.object({
  password: z
    .string()
    .nonempty('Пароль не должен быть пустым')
    .min(8, 'Минимальная длина пароля 8 символов')
})

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>