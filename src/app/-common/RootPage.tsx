import { QueryClientProvider } from '@tanstack/react-query'
import { App } from '@app/-common/App'
//@src
import { queryClient } from '../../queryClient'
import { ThemeProvider } from '@app/-common/context/ThemeProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { MainLayout } from '@app/-common/layouts/MainLayout'

function RootPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <SidebarProvider>
          <App>
            <MainLayout />
          </App>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default RootPage
