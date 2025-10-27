import { QueryClientProvider } from '@tanstack/react-query'
import { App } from '@app/-common/App'
//@src
import { queryClient } from '../../queryClient'
import { ThemeProvider } from '@app/-common/context/ThemeProvider'
import { CurrencyProvider } from '@app/-common/context/CurrencyProvider'
import { AuthProvider } from '@app/-common/context/AuthProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from '@tanstack/react-router'
import { ExchangeRatesBootstrapper } from '@app/-common/api/ExchangeRatesBootstrapper'
import { ChatProvider } from '@app/-chat/context/ChatProvider'

function RootPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <CurrencyProvider>
          <AuthProvider>
            <SidebarProvider>
              <ChatProvider>
                <ExchangeRatesBootstrapper />
                <App>
                  <Outlet />
                </App>
              </ChatProvider>
            </SidebarProvider>
          </AuthProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default RootPage
