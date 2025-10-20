import { z } from 'zod'

const metaSchema = z
  .object({
    height: z.number().nullable().optional(),
    width: z.number().nullable().optional(),
  })
  .optional()

// Generic file/image object from vault (many places only guarantee url)
export const vaultFileSchema = z.object({
  access: z.string().optional(),
  meta: metaSchema,
  mime: z.string().optional(),
  name: z.string().optional(),
  path: z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
  url: z.string(),
})

// Allow fields that sometimes arrive as JSON strings to be parsed into proper objects/arrays
const jsonStringToObject = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val)
      } catch (_) {
        return val
      }
    }
    return val
  }, schema)

// Facilities items
const facilitySchema = z.object({
  image: vaultFileSchema,
  image_source: z.string(),
  name: z.string(),
})

// Map points
const mapPointSchema = z.object({
  distance_km: z.number(),
  name: z.string(),
})

// Buildings
const buildingSchema = z.object({
  Building_ID: z.string().optional(),
  Building_image: z.array(vaultFileSchema).optional(),
  Completion_date: z.any().nullable().optional(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  Project: z.array(z.number()).optional(),
  created_at: z.number().optional(),
  id: z.number().optional(),
})

// Parking
const parkingItemSchema = z.object({
  Parking_spaces: z.number(),
  Unit_bedrooms: z.array(z.string()),
  Unit_type: z.string(),
})

// Payment plans
const paymentScheduleItemSchema = z.object({
  Order: z.number(),
  Payment_time: z.string(),
  Percent_of_payment: z.string(),
})

const paymentPlanSchema = z.object({
  Payments: z.array(z.array(paymentScheduleItemSchema)),
  Plan_name: z.string(),
  months_after_handover: z.number(),
})

// Developer data
const developerDataSchema = z.object({
  description: z.string().optional(),
  email: z.string().optional(),
  id: z.number(),
  logo_image: z.array(z.object({ url: z.string() })).optional(),
  name: z.string(),
  office_address: z.string().optional(),
  website: z.string().optional(),
  working_hours: z
    .array(
      z.object({
        days: z.string(),
        time_range: z.string(),
      }),
    )
    .optional(),
})

// Unit blocks
const unitBlockSchema = z.object({
  area_unit: z.string(),
  id: z.number(),
  name: z.string(),
  normalized_type: z.string(),
  price_currency: z.string(),
  typical_unit_image_url: jsonStringToObject(z.array(vaultFileSchema)).optional(),
  unit_type: z.string(),
  units_area_from: z.number().nullable().optional(),
  units_area_from_m2: z.string().nullable().optional(),
  units_area_to: z.number().nullable().optional(),
  units_area_to_m2: z.string().nullable().optional(),
  units_price_from: z.number().nullable().optional(),
  units_price_from_aed: z.number().nullable().optional(),
  units_price_to: z.number().nullable().optional(),
  units_price_to_aed: z.number().nullable().optional(),
})

// Root schema for a single developer complex/project
export const DeveloperComplexSchema = z.object({
  // core
  id: z.number(),
  name: z.string(),
  area: z.string().nullable().optional(),
  area_unit: z.string().nullable().optional(),
  brochure_url: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  completion_datetime: z.string().nullable().optional(),
  coordinates: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  cover: vaultFileSchema.optional(),
  cover_image_url: jsonStringToObject(vaultFileSchema).nullable().optional(),
  developer: z.string().nullable().optional(),
  developer_data: developerDataSchema.optional(),
  developer_website: z.string().nullable().optional(),

  // media
  architecture: z.array(vaultFileSchema).optional(),
  interior: z.array(vaultFileSchema).optional(),
  lobby: z.array(vaultFileSchema).optional(),
  master_plan: z.array(z.object({ url: z.string() })).optional(),
  video_url: z.string().nullable().optional(),

  // attributes
  furnishing: z.string().nullable().optional(),
  has_escrow: z.boolean().nullable().optional(),
  is_partner_project: z.boolean().nullable().optional(),
  layouts_pdf: z.string().nullable().optional(),
  max_area: z.number().nullable().optional(),
  max_price: z.number().nullable().optional(),
  min_area: z.number().nullable().optional(),
  min_price: z.number().nullable().optional(),
  min_price_aed: z.number().nullable().optional(),
  overview: z.string().nullable().optional(),
  parking: z.string().nullable().optional(),
  post_handover: z.boolean().nullable().optional(),
  price_currency: z.string().nullable().optional(),
  readiness: z.string().nullable().optional(),
  sale_status: z.string().nullable().optional(),
  service_charge: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  website: z.string().nullable().optional(),

  // arrays / nested structures
  buildings: z.array(z.array(buildingSchema)).optional(),
  facilities: z.array(facilitySchema).optional(),
  map_points: z.array(mapPointSchema).optional(),
  parkings: z.array(z.array(parkingItemSchema)).optional(),
  payment_plans: z.array(paymentPlanSchema).optional(),
  unit_availability: z.array(z.any()).optional(),
  unit_blocks: z.array(unitBlockSchema).optional(),
})

export type TDeveloperComplex = z.infer<typeof DeveloperComplexSchema>
