import { FC } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AgentDialog } from './AgentDialog'
import { cn } from '@/lib/utils'

interface IProps {
  input: string
  setInput: (value: string | ((prev: string) => string)) => void
  isPending: boolean
  handleSend: () => void
  hasError?: boolean
}

export const ChatTextArea: FC<IProps> = ({ input, setInput, isPending, handleSend, hasError }) => {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className='sticky bottom-0 left-0 right-0 w-full bg-gradient-to-b from-transparent via-white to-white border-t pt-2'>
      <form
        onSubmit={handleSubmit}
        className={cn(
          'isolate z-[3] w-full basis-auto md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent flex flex-col',
          'pb-3',
          hasError &&
            'has-data-has-thread-error:pt-2 has-data-has-thread-error:[box-shadow:var(--sharp-edge-bottom-shadow)]',
        )}
      >
        <div className='relative flex w-full flex-col'>
          <div className='relative'>
            <div className='absolute left-3 bottom-2.5'>
              <AgentDialog isPending={isPending} />
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              className='w-full resize-none rounded-xl border border-black/10 bg-white pl-12 pr-12 py-[10px] focus-within:outline-none text-sm leading-5 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'
              style={{ maxHeight: '200px', height: '52px', overflowY: 'hidden' }}
            />
            <div className='absolute right-3 bottom-2.5'>
              <button
                type='submit'
                disabled={!input.trim() || isPending}
                className='text-white bg-black hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-black rounded-full p-1.5 transition-colors'
              >
                <ArrowUp className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
