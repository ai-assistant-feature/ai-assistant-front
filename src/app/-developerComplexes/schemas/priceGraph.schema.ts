import { z } from 'zod'

export const RoomTypeEnum = z.enum([
  'Studio',
  '1 B/R',
  '2 B/R',
  '3 B/R',
  '4 B/R',
  '5 B/R',
  '6 B/R',
  '7 B/R',
  'PENTHOUSE',
  'Office',
])

export const PriceGraphPointSchema = z.object({
  avg_trans_value: z.number(),
  avg_trans_value_per_area: z.number(),
  doc_count: z.number(),
  name: z.string(),
  by_rooms: z.array(
    z.object({
      avg_trans_value: z.number(),
      avg_trans_value_per_area: z.number(),
      room: RoomTypeEnum,
    }),
  ),
})

export type TPriceGraphPoint = z.infer<typeof PriceGraphPointSchema>

export const PriceGraphResponseSchema = z.object({
  by_area: z.array(PriceGraphPointSchema),
  global: z.array(PriceGraphPointSchema),
  property_area: z.string(),
  property_id: z.number(),
})

export type TPriceGraphResponse = z.infer<typeof PriceGraphResponseSchema>
