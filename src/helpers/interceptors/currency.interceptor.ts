import type { InternalAxiosRequestConfig } from 'axios'

const currencyInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const currency = (localStorage.getItem('app-currency') as string) || 'AED'
  if ((config.headers as any)?.set) {
    ;(config.headers as any).set('X-Currency', currency)
  } else {
    config.headers = { ...(config.headers as any), 'X-Currency': currency } as any
  }
  return config
}

export { currencyInterceptor }
