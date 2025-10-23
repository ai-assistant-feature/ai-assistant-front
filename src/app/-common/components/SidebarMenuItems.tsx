import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { LucideIcon } from 'lucide-react'

interface MenuItem {
  titleKey: string
  icon?: LucideIcon
  showLanguage?: boolean
  showCurrency?: boolean
  onClick: () => void
}

interface SidebarMenuItemsProps {
  items: MenuItem[]
  currentLanguage?: string
  currentCurrencyLabel?: string
}

export function SidebarMenuItems({
  items,
  currentLanguage,
  currentCurrencyLabel,
}: SidebarMenuItemsProps) {
  const { t } = useTranslation()

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.titleKey}>
          <SidebarMenuButton asChild>
            <div
              className='flex items-center gap-2 px-2 py-2 pt-6 pb-6 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors'
              onClick={item.onClick}
            >
              {item.icon && <item.icon className='w-4 h-4 text-muted-foreground' />}
              <span className='text-foreground'>{t(item.titleKey)}</span>
              {item.showLanguage && (
                <span className='ml-auto text-sm text-muted-foreground'>{currentLanguage}</span>
              )}
              {item.showCurrency && (
                <span className='ml-auto text-sm text-muted-foreground'>
                  {currentCurrencyLabel}
                </span>
              )}
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
