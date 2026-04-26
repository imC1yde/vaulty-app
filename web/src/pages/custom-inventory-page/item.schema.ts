import { z } from 'zod'

export const itemSchema = z.object({
  id: z.uuid('ID неверного формата')
    .nullish(),
  name: z.string()
    .nonempty('Название не может быть пустым')
    .max(128, 'Слишком длинное название'),
  description: z.string()
    .nonempty('Описание не может быть пустым')
    .max(1024, 'Слишком длинное описание'),
  image: z.instanceof(File, { message: 'Необходимо загрузить файл' })
    .refine((file) => file.size <= 64 * 1024 * 1024, 'Размер файла не может превышать 8МБ')
    .refine(
      (file) => file.type.startsWith('image/'),
      'Файл должен быть изображением (webp, jpg, png и т.д.)'
    )
})

export type ItemSchema = z.infer<typeof itemSchema>