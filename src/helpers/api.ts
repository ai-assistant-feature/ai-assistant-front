// import config from "config"
import axios from 'axios'

const httpService = axios.create({
  baseURL: ``,
})

// МОЖЕМ ДОБАВИТЬ interceptors
// httpService.interceptors.request.use(tokenInterceptor)

export { httpService }
