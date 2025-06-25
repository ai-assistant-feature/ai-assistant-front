import { z } from 'zod'

// Схема для элемента в массиве results (соответствует IItem)
const ResultItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  developer: z.string(),
  area: z.string(),
  coordinates: z.string(),
  image: z.string(),
  status: z.string(),
  sale_status: z.string(),
  price_currency: z.string(),
  post_handover: z.boolean(),
})

// Основная схема ответа
export const GptMessageResponseSchema = z.object({
  title: z.string(),
  results: z.array(ResultItemSchema),
})

// Тип для TypeScript
export type GptMessageResponse = z.infer<typeof GptMessageResponseSchema>

// Функция для валидации ответа
export const validateGptMessageResponse = (data: unknown): GptMessageResponse => {
  return GptMessageResponseSchema.parse(data)
}

// Функция для безопасной валидации (возвращает null при ошибке)
export const safeValidateGptMessageResponse = (data: unknown): GptMessageResponse | null => {
  const result = GptMessageResponseSchema.safeParse(data)
  return result.success ? result.data : null
}
