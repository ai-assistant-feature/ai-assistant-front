import z from 'zod'

const FormSchema = z.object({
  name: z.string().min(3, 'Название должно быть минимум 3 символа'),
  description: z.string().min(10, 'Описание должно быть минимум 10 символов'),
  private: z.boolean(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  adminId: z.number(),
})

export type TCommunity = z.infer<typeof FormSchema>
