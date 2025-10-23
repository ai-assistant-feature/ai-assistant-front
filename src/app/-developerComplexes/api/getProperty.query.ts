import { httpService } from '@/helpers/api'
import { useQuery } from '@tanstack/react-query'

export const PropertyQueryKey = ['property'] as const

export const fetchProperty = async ({
  propertyId,
}: {
  propertyId: string | null
}): Promise<any> => {
  if (!propertyId) return null
  const response = await httpService.get(`/api/v1/properties/${propertyId}`)
  return response.data.property
}

const useGetPropertyQuery = ({ propertyId }: { propertyId: string | null }) => {
  return useQuery({
    queryKey: PropertyQueryKey,
    queryFn: () => fetchProperty({ propertyId }),
    enabled: !!propertyId,
  })
}

export { useGetPropertyQuery }
