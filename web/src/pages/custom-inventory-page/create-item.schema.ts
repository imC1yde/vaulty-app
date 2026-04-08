import { z } from 'zod'

export const createItemSchema = z.object({
  name: z.string().nonempty('Название не может быть пустым'),
  description: z.string().nonempty('Описание не может быть пустым'),
  image: z
    .instanceof(File, { message: 'Необходимо загрузить файл' })
    .refine((file) => file.size <= 64 * 1024 * 1024, 'Размер файла не может превышать 8МБ')
    .refine(
      (file) => file.type.startsWith('image/'),
      'Файл должен быть изображением (webp, jpg, png и т.д.)'
    )
})

export type CreateItemSchema = z.infer<typeof createItemSchema>