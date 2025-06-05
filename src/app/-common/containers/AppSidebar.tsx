import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { MessageSquareText, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { LanguageDrawer } from '../components/LanguageDrawer'

const LANGUAGES = {
  en: 'English',
  ru: 'Русский',
} as const

export function AppSidebar() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = LANGUAGES[i18n.language as keyof typeof LANGUAGES] || i18n.language

  const changeLanguage = (lang: keyof typeof LANGUAGES) => {
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  // Menu items.
  const items = [
    {
      titleKey: 'sidebar.language',
      icon: Globe,
      showLanguage: true,
      onClick: () => setIsOpen(true),
    },
  ]

  return (
    <>
      <Sidebar
        style={{
          background: '#fff',
        }}
        className='flex flex-col justify-between h-full'
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='flex items-center gap-2 border-b border-gray-300 pb-3 mb-6 mt-4  rounded-none'>
              <MessageSquareText className='w-5 h-5' />
              <span>{t('sidebar.newChat')}</span>
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.titleKey}>
                    <SidebarMenuButton asChild>
                      <div
                        className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer'
                        onClick={item.onClick}
                      >
                        {item.icon && <item.icon className='w-4 h-4 text-gray-500' />}
                        <span className='text-gray-600'>{t(item.titleKey)}</span>
                        {item.showLanguage && (
                          <span className='ml-auto text-sm text-gray-400'>{currentLanguage}</span>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className='p-4'>
          <p className='mb-4 text-xs text-gray-600'>{t('sidebar.saveDescription')}</p>
          <Button disabled className='w-full'>
            {t('login')}
          </Button>
        </SidebarFooter>
      </Sidebar>

      <LanguageDrawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onLanguageChange={changeLanguage}
        currentLanguage={i18n.language}
      />
    </>
  )
}
