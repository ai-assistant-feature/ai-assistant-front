import { QueryClientProvider } from '@tanstack/react-query'
import { App } from '@app/-common/App'
//@src
import { queryClient } from '../../queryClient'
import { ThemeProvider } from '@app/-common/context/ThemeProvider'
import { CurrencyProvider } from '@app/-common/context/CurrencyProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { MainLayout } from '@app/-common/layouts/MainLayout'
import { ExchangeRatesBootstrapper } from '@app/-common/api/ExchangeRatesBootstrapper'

function RootPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <CurrencyProvider>
          <SidebarProvider>
            <ExchangeRatesBootstrapper />
            <App>
              <MainLayout />
            </App>
          </SidebarProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default RootPage
