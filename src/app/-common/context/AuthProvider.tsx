import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth, googleProvider } from '@/helpers/firebase'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextState = {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const initialState: AuthContextState = {
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
}

const AuthContext = createContext<AuthContextState>(initialState)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    const idToken = await result.user.getIdToken()
    // For debugging and backend integration discovery
    // eslint-disable-next-line no-console
    console.log('User:', result.user)
    // eslint-disable-next-line no-console
    console.log('Firebase ID Token:', idToken)
  }

  const logout = async () => {
    await signOut(auth)
  }

  const value = useMemo<AuthContextState>(
    () => ({ user, loading, signInWithGoogle, logout }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
