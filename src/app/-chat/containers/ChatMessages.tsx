import { MessageSquareMore } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { FC, useRef, useEffect } from 'react'
import { TMessage } from '@app/-chat/infra/chat.infra'
import { useTranslation } from 'react-i18next'
import { useIsMobile } from '@/hooks/use-mobile'

// components
import { UserMessage } from '@app/-chat/components/UserMessage'
import { GPTMessage } from '@app/-chat/containers/GPTMessage'
import { ChatLoading } from '@app/-chat/components/ChatLoading'
import { TAssistantResponse } from '../schemas/assistantResponce.schema'

interface IProps {
  messages: TMessage[]
  isPending: boolean
  isError: boolean
  inputHeight?: number
}

const EmptyState = () => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col items-center justify-center text-center text-muted-foreground px-4 mt-40 mb-10'>
      <MessageSquareMore className='w-6 h-6 mb-2 text-muted-foreground' />
      <h2 className='text-sm font-semibold mb-2'>{t('chat.emptyState.title')}</h2>
      <p className='text-xs text-muted-foreground'>{t('chat.emptyState.description')}</p>
    </div>
  )
}

const MessageItem = ({ msg }: { msg: TMessage }) => {
  return msg.role === 'user' ? (
    <UserMessage content={typeof msg.content === 'string' ? msg.content : ''} />
  ) : (
    <GPTMessage content={msg.content as TAssistantResponse} />
  )
}

const MessageList = ({ messages }: { messages: TMessage[] }) => {
  return (
    <div className='flex flex-col gap-3 w-full pb-4 mt-20'>
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => (
          <MessageItem key={idx} msg={msg} />
        ))}
      </AnimatePresence>
    </div>
  )
}

const ChatMessages: FC<IProps> = ({ messages, isPending, isError, inputHeight = 0 }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isPending])

  const marginBottom = isMobile ? inputHeight + 62 : inputHeight + 100

  return (
    <div className='flex-1 overflow-y-auto' style={{ marginBottom: `${marginBottom}px` }}>
      {messages.length === 0 ? <EmptyState /> : <MessageList messages={messages} />}
      {isPending && <ChatLoading />}
      {isError && (
        <div className='p-4 text-destructive bg-destructive/10 rounded-lg m-4'>
          Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export { ChatMessages }
