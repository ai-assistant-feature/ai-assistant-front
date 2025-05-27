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

export const ChatTextArea: FC<IProps> = ({ input, setInput, isPending, handleSend, hasError }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className='sticky bottom-6 left-0 right-0 w-full bg-white'>
      <form
        onSubmit={handleSubmit}
        className={cn(
          'isolate z-[3] w-full basis-auto md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent flex flex-col',
          'pb-3',
          hasError &&
            'has-data-has-thread-error:pt-2 has-data-has-thread-error:[box-shadow:var(--sharp-edge-bottom-shadow)]',
        )}
      >
        <div className='relative w-full'>
          <div className='relative border rounded-4xl p-8'>
            <div className='flex-1 mb-10'>
              <ChatInput value={input} onChange={setInput} />
            </div>
            <ChatActions isPending={isPending} isDisabled={!input.trim()} onSubmit={handleSend} />
          </div>
        </div>
      </form>
    </div>
  )
}
