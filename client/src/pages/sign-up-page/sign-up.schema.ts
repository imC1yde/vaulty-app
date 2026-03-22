import { z } from "zod"

export const signUpSchema = z.object({
  email: z.email('Неверный формат email'),
  password: z
    .string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .regex(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .regex(/[!?,.:;]/, 'Пароль должен сожержать хотя бы один специальный символ: !?,.:;'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: [ "confirmPassword" ]
})

export type SignUpSchema = z.infer<typeof signUpSchema>