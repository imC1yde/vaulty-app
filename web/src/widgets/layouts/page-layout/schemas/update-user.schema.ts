import { z } from 'zod'

export const updateUserSchema = z.object({
  username: z
    .string()
    .nonempty('Имя не может быть пустым')
    .max(32, 'Слишком длинное имя')
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>