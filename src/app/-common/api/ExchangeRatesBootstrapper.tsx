import { useGetExchangeRatesQuery } from '@app/-common/api/getExchangeRates.query'

// TODO: это нужно будет вынести в отдельный файл (будут еще другие апишки)
function ExchangeRatesBootstrapper() {
  // Trigger global fetch and cache on app start
  useGetExchangeRatesQuery()
  return null
}

export { ExchangeRatesBootstrapper }
