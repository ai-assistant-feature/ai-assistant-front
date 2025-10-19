// import config from "config"
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const httpService = axios.create({
  baseURL,
})

// МОЖЕМ ДОБАВИТЬ interceptors
// httpService.interceptors.request.use(tokenInterceptor)

export { httpService }
