import type { InternalAxiosRequestConfig } from 'axios'
import { auth } from '@/helpers/firebase'

export async function authInterceptor(config: InternalAxiosRequestConfig) {
  const currentUser = auth.currentUser
  if (currentUser) {
    try {
      const idToken = await currentUser.getIdToken()
      if (idToken) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${idToken}`
      }
    } catch (_) {
      // ignore token retrieval errors; proceed without Authorization header
    }
  }
  return config
}
