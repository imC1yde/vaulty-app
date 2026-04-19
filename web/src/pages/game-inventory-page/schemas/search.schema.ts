import { z } from 'zod'

export const searchSchema = z.object({
  search: z.string().nonempty('Введите незвание игры')
})

export type SearchSchema = z.infer<typeof searchSchema>