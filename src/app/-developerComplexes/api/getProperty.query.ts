import { httpService } from '@/helpers/api'
import { useQuery } from '@tanstack/react-query'

const propertyId = '2930'
export const PropertyQueryKey = ['property'] as const

export const fetchProperty = async (): Promise<any> => {
  const response = await httpService.get(`/api/v1/properties/${propertyId}`)
  return response.data
}

const useGetPropertyQuery = () => {
  return useQuery({
    queryKey: PropertyQueryKey,
    queryFn: fetchProperty,
  })
}

export { useGetPropertyQuery }
