import { z } from 'zod'

//TODO: Схема для соцсетей (потом добавить)
// const socialSchema = z.object({
//   platform: z.string(),
//   url: z.string().url(),
// })

// Основная схема пользователя для Supabase
export const userSchema = z.object({
  id: z.number(),
  description: z.string().optional(),
  location: z.string().nullish(), // может быть строкой, null или undefined
  profession: z.string().min(2).max(50).optional(),
  contribution: z.string().min(2).max(100).optional(),
  skills: z.union([z.string(), z.array(z.string())]).optional(),
  hobbies: z.union([z.string(), z.array(z.string())]).optional(),
  email: z.string().email().optional(),
  // socials: z.array(socialSchema).optional(),
})

export type TUser = z.infer<typeof userSchema>
