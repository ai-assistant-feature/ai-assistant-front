import { Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@app/-common/components/AppSidebar'
import { Toaster } from '@/components/ui/sonner'

export function MainLayout() {
  return (
    <>
      <div id='dialog-root' />
      <div className='flex h-screen'>
        <AppSidebar />
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
        <Toaster />
      </div>
    </>
  )
}
