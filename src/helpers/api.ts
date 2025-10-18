// import config from "config"
import axios from 'axios'

const httpService = axios.create({
  baseURL: `http://localhost:3000`,
})

// МОЖЕМ ДОБАВИТЬ interceptors
// httpService.interceptors.request.use(tokenInterceptor)

export { httpService }
