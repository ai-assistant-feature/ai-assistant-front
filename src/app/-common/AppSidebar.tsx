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
import { MessageSquareText } from 'lucide-react'

// Menu items.
const items = [
  {
    title: 'Настройки',
    url: '#',
  },
  {
    title: 'Локация',
    url: '#',
  },
]

export function AppSidebar() {
  return (
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
            <span>Новый чат</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
                      <span className='text-gray-600'>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4'>
        <p className='mb-4 text-xs text-gray-600'>
          Сохраняйте понравившиеся объекты, делитесь ими с друзьями и возвращайтесь к ним в любое
          время.
        </p>
        <Button disabled className='w-full'>
          Зарегистрироваться или войти
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
