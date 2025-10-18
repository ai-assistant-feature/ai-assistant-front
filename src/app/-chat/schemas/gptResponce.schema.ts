import { ApartmentSchema } from '@app/-common/schemas/apartments.schema'
import { z } from 'zod'

export const ResponseTypeEnum = z.enum(['apartmentsList', 'needMoreInfo', 'smallTalk'])
export type ResponseType = z.infer<typeof ResponseTypeEnum>

export const ActionButtonSchema = z.object({
  label: z.string(), // текст кнопки
  actionType: z.enum(['select', 'navigate', 'input', 'custom']),
  value: z.union([z.string(), z.number()]).optional(), // выбранное значение, сумма или id объекта
  payload: z.record(z.any()).optional(), // дополнительная информация (например {usage: 'investment'})
})

export const ApiResponseSchema = z.object({
  status: z.any(),
  responceType: ResponseTypeEnum,
  //FIXME: добавить другие типы данных
  data: z
    .object({
      items: z.array(ApartmentSchema).default([]),
    })
    .nullable(),
  //
  message: z.string().nullable(),
  // FIXME: подумать над action buttons
  actionButtons: z.array(ActionButtonSchema).default([]),
})

export type TGPTApiResponse = z.infer<typeof ApiResponseSchema>
