import { useQuery } from '@tanstack/react-query'
import {
  DeveloperComplexSchema,
  TDeveloperComplex,
} from '@app/-common/schemas/developerComplex.schema'

// Запрос одного объекта недвижимости по ID через новый API
const usePropertyByIdQuery = (propertyId: string | null) => {
  return useQuery<TDeveloperComplex, Error>({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      if (!propertyId) {
        throw new Error('Не указан propertyId')
      }

      const url = `https://search-listings-production.up.railway.app/v1/properties/${propertyId}`

      const apiKey = import.meta.env.VITE_REELLY_API_KEY

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey,
          'accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`)
      }

      const json = await response.json()
      return DeveloperComplexSchema.parse(json)
    },
    enabled: !!propertyId,
  })
}

export { usePropertyByIdQuery }
