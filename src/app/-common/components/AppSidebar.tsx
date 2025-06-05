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
import { MessageSquareText, Globe, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Drawer } from 'vaul'
import { useState } from 'react'

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

      <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className='fixed inset-0 bg-black/40' style={{ zIndex: 999 }} />
          <Drawer.Content
            className='bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]'
            style={{ zIndex: 999 }}
          >
            <div className='p-4 bg-white rounded-t-[10px] flex-1'>
              <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8' />
              <div className='max-w-md mx-auto'>
                <h2 className='font-medium mb-4'>{t('sidebar.language')}</h2>
                <div className='space-y-2'>
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <button
                      key={code}
                      className='flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100'
                      onClick={() => changeLanguage(code as keyof typeof LANGUAGES)}
                    >
                      <span>{name}</span>
                      {i18n.language === code && <Check className='w-4 h-4 text-green-500' />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
