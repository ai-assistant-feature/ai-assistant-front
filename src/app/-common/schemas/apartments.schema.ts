// FIXME: переделать на инфу из api

import { z } from 'zod'

export const ApartmentSchema = z.object({
  name: z.string(),
  developer: z.string(),
  area: z.string(),
  coordinates: z.string(),
  image: z.string(),
  status: z.string(),
  sale_status: z.string(),
  price_currency: z.string(),
  post_handover: z.boolean(),
  id: z.string(),
})

export type TApartment = z.infer<typeof ApartmentSchema>
