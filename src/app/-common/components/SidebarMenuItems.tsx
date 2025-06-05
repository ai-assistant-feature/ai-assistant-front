import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { LucideIcon } from 'lucide-react'

interface MenuItem {
  titleKey: string
  icon?: LucideIcon
  showLanguage?: boolean
  onClick: () => void
}

interface SidebarMenuItemsProps {
  items: MenuItem[]
  currentLanguage?: string
}

export function SidebarMenuItems({ items, currentLanguage }: SidebarMenuItemsProps) {
  const { t } = useTranslation()

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.titleKey}>
          <SidebarMenuButton asChild>
            <div
              className='flex items-center gap-2 px-2 py-2 pt-6 pb-6 hover:bg-gray-100 rounded-md cursor-pointer'
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
  )
}
