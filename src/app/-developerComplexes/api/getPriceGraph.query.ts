import { httpService } from '@/helpers/api'
import { useQuery } from '@tanstack/react-query'
import {
  PriceGraphResponseSchema,
  type TPriceGraphResponse,
} from '@app/-developerComplexes/schemas/priceGraph.schema'

export const priceGraphQueryKey = (propertyId: string | null) => ['priceGraph', propertyId] as const

export const fetchGetPriceGraph = async ({
  propertyId,
}: {
  propertyId: string | null
}): Promise<TPriceGraphResponse | null> => {
  if (!propertyId) return null
  const response = await httpService.get(`/api/v1/price_graph?property_id=${propertyId}`)
  return PriceGraphResponseSchema.parse(response.data)
}

const useGetPriceGraphQuery = ({ propertyId }: { propertyId: string | null }) => {
  return useQuery<TPriceGraphResponse | null>({
    queryKey: priceGraphQueryKey(propertyId),
    queryFn: () => fetchGetPriceGraph({ propertyId }),
    enabled: !!propertyId,
  })
}

export { useGetPriceGraphQuery }
