import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  type User,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult,
  type UserCredential,
} from 'firebase/auth'
import { auth, googleProvider } from '@/helpers/firebase'
import { httpService } from '@/helpers/api'
import { useSessionMutation } from '@/app/(auth)/-api/session.mutate'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextState = {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  // Phone auth
  sendPhoneCode: (
    phoneNumber: string,
    options?: { buttonId?: string; size?: 'invisible' | 'normal' },
  ) => Promise<void>
  confirmPhoneCode: (code: string) => Promise<UserCredential>
  phoneVerificationInFlight: boolean
  phoneConfirmationReady: boolean
  phoneAuthError: string | null
  resetPhoneAuth: () => void
  logout: () => Promise<void>
}

const initialState: AuthContextState = {
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  sendPhoneCode: async () => {},
  confirmPhoneCode: async () => {
    throw new Error('Phone confirmation not initialized')
  },
  phoneVerificationInFlight: false,
  phoneConfirmationReady: false,
  phoneAuthError: null,
  resetPhoneAuth: () => {},
  logout: async () => {},
}

const AuthContext = createContext<AuthContextState>(initialState)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [phoneVerificationInFlight, setPhoneVerificationInFlight] = useState<boolean>(false)
  const [phoneConfirmationReady, setPhoneConfirmationReady] = useState<boolean>(false)
  const [phoneAuthError, setPhoneAuthError] = useState<string | null>(null)
  const confirmationResultRef = useRef<ConfirmationResult | null>(null)
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)
  const { mutateAsync: setBackendSession } = useSessionMutation()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // Keep backend HttpOnly session cookie in sync with Firebase ID token
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (u) => {
      if (u) {
        try {
          const idToken = await u.getIdToken()
          await setBackendSession(idToken)
        } catch {}
      }
    })
    return () => unsub()
  }, [setBackendSession])

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    const idToken = await result.user.getIdToken()
    // For debugging and backend integration discovery
    // eslint-disable-next-line no-console
    console.log('User:', result.user)
    // eslint-disable-next-line no-console
    console.log('Firebase ID Token:', idToken)
    // Establish HttpOnly session cookie on backend
    try {
      await setBackendSession(idToken)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to establish backend session cookie:', error)
    }
  }

  const ensureRecaptchaVerifier = (
    buttonId: string,
    size: 'invisible' | 'normal' = 'invisible',
  ) => {
    if (recaptchaVerifierRef.current) return recaptchaVerifierRef.current
    // Ensure the button exists in DOM when creating invisible Recaptcha bound to buttonId
    const verifier = new RecaptchaVerifier(auth, buttonId, {
      size,
      callback: () => {
        // Auto-callback when solved; actual sending handled explicitly
      },
    })
    recaptchaVerifierRef.current = verifier
    return verifier
  }

  const sendPhoneCode = async (
    phoneNumber: string,
    options?: { buttonId?: string; size?: 'invisible' | 'normal' },
  ) => {
    setPhoneAuthError(null)
    setPhoneVerificationInFlight(true)
    try {
      const buttonId = options?.buttonId ?? 'phone-send-button'
      const size = options?.size ?? 'invisible'
      const appVerifier = ensureRecaptchaVerifier(buttonId, size)
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      confirmationResultRef.current = confirmation
      setPhoneConfirmationReady(true)
    } catch (error: any) {
      setPhoneAuthError(error?.message ?? 'Не удалось отправить код')
      // Reset expired/failed reCAPTCHA if needed
      try {
        const verifier = recaptchaVerifierRef.current
        if (verifier) {
          await verifier.render().then((widgetId) => {
            // @ts-expect-error grecaptcha global provided by Google
            if (typeof grecaptcha !== 'undefined') grecaptcha.reset(widgetId)
          })
        }
      } catch {}
      throw error
    } finally {
      setPhoneVerificationInFlight(false)
    }
  }

  const confirmPhoneCode = async (code: string): Promise<UserCredential> => {
    setPhoneAuthError(null)
    const confirmation = confirmationResultRef.current
    if (!confirmation) {
      throw new Error('Код подтверждения не инициализирован. Сначала отправьте СМС код.')
    }
    try {
      const credential = await confirmation.confirm(code)
      // Clear local phone state after success
      setPhoneConfirmationReady(false)
      confirmationResultRef.current = null
      // Optionally clear reCAPTCHA instance
      try {
        recaptchaVerifierRef.current?.clear()
      } catch {}
      recaptchaVerifierRef.current = null
      return credential
    } catch (error: any) {
      setPhoneAuthError(error?.message ?? 'Неверный код подтверждения')
      throw error
    }
  }

  const resetPhoneAuth = () => {
    setPhoneAuthError(null)
    setPhoneConfirmationReady(false)
    confirmationResultRef.current = null
    try {
      recaptchaVerifierRef.current?.clear()
    } catch {}
    recaptchaVerifierRef.current = null
  }

  const logout = async () => {
    try {
      await httpService.post('/api/auth/logout', {}, { withCredentials: true })
    } catch {}
    await signOut(auth)
  }

  const value = useMemo<AuthContextState>(
    () => ({
      user,
      loading,
      signInWithGoogle,
      sendPhoneCode,
      confirmPhoneCode,
      phoneVerificationInFlight,
      phoneConfirmationReady,
      phoneAuthError,
      resetPhoneAuth,
      logout,
    }),
    [user, loading, phoneVerificationInFlight, phoneConfirmationReady, phoneAuthError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
