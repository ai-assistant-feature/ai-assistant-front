import { Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
// containers
import { Header } from '@app/-common/containers/Header'
import { AppSidebar } from '@app/-common/containers/AppSidebar'

export function MainLayout() {
  return (
    <>
      <div id='dialog-root' />
      <div className='flex h-screen w-full'>
        <Header />
        <AppSidebar />
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
        <Toaster />
      </div>
    </>
  )
}
