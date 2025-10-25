import { z } from 'zod'
// schemas
import { DeveloperComplexesSchema } from '@app/-developerComplexes/schemas/developerComplexes.schema'

export const ResponseTypeEnum = z.enum(['apartmentsList', 'needMoreInfo', 'smallTalk'])
export type ResponseType = z.infer<typeof ResponseTypeEnum>

export const ActionButtonSchema = z.object({
  label: z.string(), // текст кнопки
  actionType: z.enum(['select', 'navigate', 'input', 'custom']),
  value: z.union([z.string(), z.number()]).optional(), // выбранное значение, сумма или id объекта
  payload: z.record(z.any()).optional(), // дополнительная информация (например {usage: 'investment'})
})

export const AssistantResponseSchema = z.object({
  status: z.any(),
  responseType: ResponseTypeEnum,
  //FIXME: добавить другие типы данных
  data: z
    .object({
      items: z.array(DeveloperComplexesSchema).default([]),
      ai_filter_debug: z
        .object({
          currency_original: z.string().optional(),
          max_price_aed: z.number().optional(),
          max_price_original: z.number().optional(),
        })
        .optional(),
      filters_applied: z
        .object({
          max_price_aed: z.string().optional(),
          unit_bedrooms_extracted: z.array(z.any()).optional(),
          sale_statuses: z.array(z.any()).optional(),
          developers: z.array(z.any()).optional(),
          posthandover: z.boolean().optional(),
          property_areas: z.array(z.any()).optional(),
        })
        .optional(),
    })
    .nullable(),
  //
  message: z.string().nullable(),
  // FIXME: подумать над action buttons
  actionButtons: z.array(ActionButtonSchema).default([]),
})

export type TAssistantResponse = z.infer<typeof AssistantResponseSchema>
