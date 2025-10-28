import { Outlet, useNavigate } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
// containers
import { Header } from '@app/-common/containers/Header'
import { AppSidebar } from '@app/-common/containers/AppSidebar'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '@app/-common/context/AuthProvider'

export function MainLayout({ children }: { children?: ReactNode }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/login' })
    }
  }, [loading, user, navigate])

  //TODO: возможно нужно будет добавить LOADER
  if (loading) return null

  if (!user) return null

  return (
    <>
      <div id='dialog-root' />
      <div className='flex h-screen w-full'>
        <Header />
        <AppSidebar />
        <main className='flex-1 overflow-auto'>{children ?? <Outlet />}</main>
        <Toaster />
      </div>
    </>
  )
}
