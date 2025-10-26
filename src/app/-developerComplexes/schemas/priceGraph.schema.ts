import { z } from 'zod'

export const PriceGraphPointSchema = z.object({
  avg_trans_value: z.number(),
  avg_trans_value_per_area: z.number(),
  doc_count: z.number(),
  week: z.string(),
})

export type TPriceGraphPoint = z.infer<typeof PriceGraphPointSchema>

export const PriceGraphResponseSchema = z.object({
  by_area: z.array(PriceGraphPointSchema),
  global: z.array(PriceGraphPointSchema),
  property_area: z.string(),
  property_id: z.number(),
})

export type TPriceGraphResponse = z.infer<typeof PriceGraphResponseSchema>
