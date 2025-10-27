import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { X } from 'lucide-react'
// constants
import { LANGUAGES, SIDEBAR_ITEMS, SIDEBAR_ACTION_TYPES } from '@app/-common/constants/sidebar'
// components
import { LanguageDrawer } from '@app/-common/components/LanguageDrawer'
import { LanguagePopup } from '../components/LanguagePopup'
import { SidebarMenuItems } from '@app/-common/components/SidebarMenuItems'
import { useCurrency, CURRENCIES } from '@app/-common/context/CurrencyProvider'
import { CurrencyDrawer } from '@app/-common/components/CurrencyDrawer'
import { CurrencyPopup } from '@app/-common/components/CurrencyPopup'
import { useAuth } from '@app/-common/context/AuthProvider'

const AppSidebar = () => {
  const { setOpenMobile, isMobile } = useSidebar()

  const { t, i18n } = useTranslation()
  const [isLanguageDrawerOpen, setIsLanguageDrawerOpen] = useState(false)
  const [isCurrencyDrawerOpen, setIsCurrencyDrawerOpen] = useState(false)
  const { currency, setCurrency } = useCurrency()
  const { logout } = useAuth()

  const currentLanguage = LANGUAGES[i18n.language as keyof typeof LANGUAGES] || i18n.language

  const changeLanguage = (lang: keyof typeof LANGUAGES) => {
    localStorage.setItem('i18nextLng', lang)
    i18n.changeLanguage(lang)
    setIsLanguageDrawerOpen(false)
  }

  const changeCurrency = (code: keyof typeof CURRENCIES) => {
    setCurrency(code)
    setIsCurrencyDrawerOpen(false)
  }

  const handleAction = (actionType: (typeof SIDEBAR_ITEMS)[number]['actionType']) => {
    switch (actionType) {
      case SIDEBAR_ACTION_TYPES.OPEN_LANGUAGE_DRAWER:
        setIsLanguageDrawerOpen(true)
        break
      case SIDEBAR_ACTION_TYPES.OPEN_CURRENCY_DRAWER:
        setIsCurrencyDrawerOpen(true)
        break
      case SIDEBAR_ACTION_TYPES.OPEN_NEW_CHAT:
        // TODO: Implement new chat functionality
        console.log('Open new chat')
        break
      default:
        console.warn('Unknown action type:', actionType)
    }
  }

  const items = SIDEBAR_ITEMS.map((item) => ({
    ...item,
    onClick: () => handleAction(item.actionType),
  }))

  return (
    <>
      <Sidebar className='flex flex-col justify-between h-full'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='flex items-center justify-end mt-2'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => setOpenMobile(false)}
              >
                <X className='h-4 w-4' />
              </Button>
            </SidebarGroupLabel>

            <SidebarGroupContent className='mt-6'>
              <SidebarMenuItems
                items={items}
                currentLanguage={currentLanguage}
                currentCurrencyLabel={CURRENCIES[currency]}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className='p-4 mb-8'>
          <Button className='w-full' variant='secondary' onClick={logout}>
            {t('auth.logout')}
          </Button>
        </SidebarFooter>
      </Sidebar>

      {isMobile ? (
        <LanguageDrawer
          isOpen={isLanguageDrawerOpen}
          onOpenChange={setIsLanguageDrawerOpen}
          onLanguageChange={changeLanguage}
          currentLanguage={i18n.language}
        />
      ) : (
        <LanguagePopup
          open={isLanguageDrawerOpen}
          onOpenChange={setIsLanguageDrawerOpen}
          currentLanguage={i18n.language}
          onLanguageChange={changeLanguage}
        />
      )}

      {isMobile ? (
        <CurrencyDrawer
          isOpen={isCurrencyDrawerOpen}
          onOpenChange={setIsCurrencyDrawerOpen}
          onCurrencyChange={changeCurrency}
          currentCurrency={currency}
        />
      ) : (
        <CurrencyPopup
          open={isCurrencyDrawerOpen}
          onOpenChange={setIsCurrencyDrawerOpen}
          currentCurrency={currency}
          onCurrencyChange={changeCurrency}
        />
      )}
    </>
  )
}

export { AppSidebar }
