import { httpService } from '@/helpers/api'
import { useQuery } from '@tanstack/react-query'

export const ExchangeRatesQueryKey = ['exchangeRates'] as const

export const fetchExchangeRates = async (): Promise<any> => {
  const response = await httpService.get(`/api/v1/variables/exchange_rates`)
  return response.data
}

const useGetExchangeRatesQuery = () => {
  return useQuery({
    queryKey: ExchangeRatesQueryKey,
    queryFn: () => fetchExchangeRates(),
  })
}

export { useGetExchangeRatesQuery }
