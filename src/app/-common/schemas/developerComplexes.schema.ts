import { z } from 'zod'

export const DeveloperComplexesSchema = z.object({
  //  самые важные поля
  id: z.number(),
  name: z.string(),
  area: z.string(),
  coordinates: z.string(),
  developer: z.string(),
  completionDatetime: z.string(),
  coverImageUrl: z.object({
    url: z.string(),
  }),
  // дополнительные поля
  areaUnit: z.string(),
  hasEscrow: z.boolean(),
  isPartnerProject: z.boolean(),
  maxPrice: z.number().nullable(),
  minPrice: z.number().nullable(),
  minPriceAed: z.number().nullable(),
  minPricePerAreaUnit: z.boolean(),
  postHandover: z.boolean(),
  priceCurrency: z.string(),
  saleStatus: z.string(),
  status: z.string(),
})

export type TDeveloperComplexes = z.infer<typeof DeveloperComplexesSchema>
