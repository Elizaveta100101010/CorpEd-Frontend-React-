import * as z from 'zod'

export const codewordSchema = z
  .string()
  .min(2, 'Заполните поле!')
  .max(40, 'Слишком большое имя')

export const passwordSchema = z
  .string()
  .min(6, 'Пароль минимум 6 символов')
  .max(40, 'Пароль должен быть максимум 40 символов')

export const nameSchema = z
  .string()
  .min(5, 'Имя пользователя должно быть минимум 5 символов')
  .max(20, 'Имя пользователя должно быть максимум 20 символов')

  export const positionSchema = z
  .string()
  .min(1, 'Заполните поле!')


export const signInSchema = z.object({
  Login: nameSchema,
  Password: passwordSchema,
})

export const signUpSchema = z.object({
  Login: nameSchema,
  Password: passwordSchema,
  Position: positionSchema,
})

export const editUserSchema = z.object({
  userName: nameSchema,
  Password: passwordSchema,
})


export const codeWordSchema = z.object({
  Login: nameSchema,
  Codeword: codewordSchema,
  Password: passwordSchema,
})


export const resetPasswordSchema = z.object({
  Password: passwordSchema,
  NewPassword:passwordSchema,
})