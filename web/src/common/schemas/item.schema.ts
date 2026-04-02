import { z } from 'zod'

export const itemSchema: ItemSchema = z.object({
  name: z
    .string()
    .nonempty(),
  description: z
    .string()
    .nonempty(),
  image: z.file()
}).refine((schema) => schema.image.type !== 'image', {
  message: 'Файл должен иметь тип изображения',
  path: [ 'image' ]
})

export type ItemSchema = z.infer<typeof itemSchema>