import { FC } from 'react'
import { Sparkles } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface HeaderContentProps {
  onToggleDropdown: () => void
}

export const HeaderContent: FC<HeaderContentProps> = ({ onToggleDropdown }) => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 w-full h-16 px-4 flex items-center border-b bg-background border-border'>
      <div className='z-10'>
        <SidebarTrigger />
      </div>

      <div className='absolute inset-0 flex justify-center items-center pointer-events-none'>
        <h1 className='text-lg font-semibold text-foreground'>Rooma</h1>
      </div>

      <div className='ml-auto z-10'>
        <button
          onClick={onToggleDropdown}
          className='p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition'
        >
          <Sparkles className='w-5 h-5' />
        </button>
      </div>
    </header>
  )
}
