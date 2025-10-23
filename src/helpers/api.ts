// import config from "config"
import axios from 'axios'
// interceptors
import { currencyInterceptor } from './interceptors/currency.interceptor'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const httpService = axios.create({
  baseURL,
})

// Добавляем валюту в заголовок каждого запроса
httpService.interceptors.request.use(currencyInterceptor)

export { httpService }
