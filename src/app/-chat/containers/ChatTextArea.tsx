import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
// ui
import { useSidebar } from '@/components/ui/sidebar'

// components
import { ChatInput } from '@app/-chat/components/ChatInput'
import { ChatActions } from '@app/-chat/components/ChatActions'
import { QuickQuestions } from '@app/-chat/components/QuickQuestions'

interface IProps {
  isPending: boolean
  handleSend: (value: string) => void
  onHeightChange?: (height: number) => void
}

export const ChatTextArea: FC<IProps> = ({ isPending, handleSend, onHeightChange }) => {
  const { state } = useSidebar()
  const [input, setInput] = useState('')
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)

  const sendMessage = (value: string) => {
    handleSend(value)
    setShowQuickQuestions(false)
    setInput('')
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full bg-background'>
      <div
        className={cn(
          'mb-0 md:mb-6',
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
        {showQuickQuestions && <QuickQuestions handleSend={sendMessage} />}
        <form className='isolate z-[3] w-full flex flex-col md:border-transparent md:pt-0'>
          <div className='relative w-full'>
            <div className='relative border rounded-t-4xl md:rounded-4xl p-6 pt-2 bg-background border-border'>
              <div className='flex-1 mb-2'>
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onHeightChange={onHeightChange}
                  onEnter={() => sendMessage(input)}
                />
              </div>
              <ChatActions
                isPending={isPending}
                isDisabled={!input.trim()}
                onSubmit={() => sendMessage(input)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
