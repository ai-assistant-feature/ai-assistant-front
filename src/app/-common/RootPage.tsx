import { Outlet } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { App } from '@app/-common/App'
//@src
import { queryClient } from '../../queryClient'
import { ThemeProvider } from '@app/-common/context/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@app/-common/AppSidebar'

function RootPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <SidebarProvider>
          <App>
            <AppSidebar />
            <Outlet />
            <Toaster />
          </App>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default RootPage
