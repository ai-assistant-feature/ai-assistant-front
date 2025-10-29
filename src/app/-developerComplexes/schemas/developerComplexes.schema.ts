import { z } from 'zod'
import { vaultFileSchema } from './developerComplex.schema'

export const DeveloperComplexesSchema = z.object({
  // core fields
  id: z.number(),
  name: z.string(),
  area: z.string(),
  coordinates: z.string(),
  developer: z.string(),
  completion_datetime: z.string(),
  cover_image_url: vaultFileSchema,
  // additional fields
  area_unit: z.string(),
  has_escrow: z.boolean(),
  is_partner_project: z.boolean(),
  max_price: z.number(),
  min_price: z.number(),
  min_price_per_area_unit: z.number(),
  post_handover: z.boolean(),
  price_currency: z.string(),
  sale_status: z.string(),
  status: z.string(),
  max_price_bedroom_type: z.string(),
  min_price_bedroom_type: z.string(),
})

export type TDeveloperComplexes = z.infer<typeof DeveloperComplexesSchema>
