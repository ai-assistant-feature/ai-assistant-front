import { FC } from 'react'
import { cn } from '@/lib/utils'
import { ChatInput } from './ChatInput'
import { ChatActions } from './ChatActions'
import { useSidebar } from '@/components/ui/sidebar'

interface IProps {
  input: string
  setInput: (value: string | ((prev: string) => string)) => void
  isPending: boolean
  handleSend: () => void
  hasError?: boolean
}

export const ChatTextArea: FC<IProps> = ({ input, setInput, isPending, handleSend }) => {
  const { state } = useSidebar()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full bg-white'>
      <div
        className={cn(
          'w-full mx-auto transition-all duration-200 ease-linear',
          'md:[transform:translateX(var(--sidebar-shift))]',
          'md:max-w-[var(--chat-width)]',
        )}
        style={
          {
            '--sidebar-shift': state === 'expanded' ? '8rem' : '0',
            '--chat-width': state === 'expanded' ? 'calc(60% - 8rem)' : '60%',
          } as React.CSSProperties
        }
      >
        <form
          onSubmit={handleSubmit}
          className='isolate z-[3] w-full flex flex-col md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent'
        >
          <div className='relative w-full'>
            <div className='relative border rounded-4xl p-6 pt-2'>
              <div className='flex-1 mb-2'>
                <ChatInput value={input} onChange={setInput} />
              </div>
              <ChatActions isPending={isPending} isDisabled={!input.trim()} onSubmit={handleSend} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
