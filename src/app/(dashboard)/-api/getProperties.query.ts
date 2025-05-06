import { useQuery } from '@tanstack/react-query'

//FIXME:
const usePropertiesQuery = (searchQuery?: string) => {
  return useQuery({
    queryKey: ['properties', searchQuery],
    queryFn: async () => {
      const baseUrl = `https://nest-dubai.onrender.com/reelly/properties`
      const url = searchQuery
        ? `${baseUrl}?search_query=${encodeURIComponent(searchQuery)}`
        : baseUrl

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`)
      }

      return response.json()
    },
  })
}

export { usePropertiesQuery }
