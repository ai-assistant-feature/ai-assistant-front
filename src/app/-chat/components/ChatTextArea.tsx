import { FC } from 'react'
import { cn } from '@/lib/utils'
import { ChatInput } from './ChatInput'
import { ChatActions } from './ChatActions'

interface IProps {
  input: string
  setInput: (value: string | ((prev: string) => string)) => void
  isPending: boolean
  handleSend: () => void
  hasError?: boolean
}

export const ChatTextArea: FC<IProps> = ({ input, setInput, isPending, handleSend }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full bg-white'>
      <div className='w-full md:max-w-[60%] mx-auto'>
        <form
          onSubmit={handleSubmit}
          className={cn(
            'isolate z-[3] w-full basis-auto md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent flex flex-col',
          )}
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
