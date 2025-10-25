import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth, useDeviceLanguage } from 'firebase/auth'

let firebaseApp: FirebaseApp | undefined
let authInstance: Auth | undefined
let googleAuthProvider: GoogleAuthProvider | undefined

/**
 * Возвращает экземпляр FirebaseApp.
 * Лениво инициализируется при первом вызове.
 */
export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    }

    console.log('config', config)
    const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    if (measurementId) {
      config.measurementId = measurementId
    }

    Object.freeze(config) // защита от случайных изменений

    try {
      firebaseApp = getApps().length ? getApp() : initializeApp(config)
    } catch (error) {
      console.error('Ошибка инициализации Firebase:', error)
      throw error
    }
  }

  return firebaseApp
}

/**
 * Возвращает экземпляр Firebase Auth.
 * Лениво инициализируется при первом вызове.
 */
export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp())
    try {
      // Localize Auth UIs and SMS to the device/browser language
      // Falls back to default if device language cannot be determined
      useDeviceLanguage(authInstance)
    } catch {}
  }
  return authInstance
}

/**
 * Возвращает экземпляр GoogleAuthProvider.
 * Лениво создаётся при первом вызове.
 */
export function getGoogleProvider(): GoogleAuthProvider {
  if (!googleAuthProvider) {
    googleAuthProvider = new GoogleAuthProvider()
  }
  return googleAuthProvider
}

export const auth = getFirebaseAuth()
export const googleProvider = getGoogleProvider()
