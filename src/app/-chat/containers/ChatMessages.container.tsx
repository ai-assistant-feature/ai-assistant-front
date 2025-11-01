import { AnimatePresence } from 'framer-motion'
import { FC, useRef } from 'react'
import { TMessage } from '@app/-chat/infra/chat.infra'
import { useIsMobile } from '@/hooks/use-mobile'

// components
import { UserMessage } from '@app/-chat/components/UserMessage'
import { TAssistantResponse } from '../schemas/assistantResponce.schema'
import { ChatEmptyStateComponent } from '@app/-chat/components/ChatEmptyState.component'
import { useScrollToEnd } from '@app/-chat/hooks/useScrollToEnd'
import { ChatStatusComponet } from '@app/-chat/components/ChatStatus.component'

// containers
import { AssistantMessageContainer } from '@app/-chat/containers/AssistantMessage.container'
// constants
import { DESKTOP_BOTTOM_OFFSET, MOBILE_BOTTOM_OFFSET } from '@app/-chat/constants/styles.const'

interface IProps {
  messages: TMessage[]
  isPending: boolean
  isError: boolean
  inputHeight?: number
}

const ChatMessagesContainer: FC<IProps> = ({ messages, isPending, isError, inputHeight = 0 }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  useScrollToEnd(messagesEndRef, [messages, isPending])

  
  const marginBottom = inputHeight + (isMobile ? MOBILE_BOTTOM_OFFSET : DESKTOP_BOTTOM_OFFSET)

  const hasMessages = messages.length > 0

  const renderMessageContent = (msg: TMessage) => {
    if (msg.role === 'user') {
      const content = typeof msg.content === 'string' ? msg.content : ''
      return <UserMessage content={content} />
    }

    return <AssistantMessageContainer content={msg.content as TAssistantResponse} />
  }

  const renderMessages = () => {
    if (!hasMessages) {
      return <ChatEmptyStateComponent />
    }

    return (
      <div className='flex flex-col gap-3 w-full pb-4 mt-20'>
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const key = (msg as any).id || (msg as any).timestamp || JSON.stringify(msg)
            return <div key={key}>{renderMessageContent(msg)}</div>
          })}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className='flex-1 overflow-y-auto' style={{ marginBottom }}>
      {renderMessages()}
      <ChatStatusComponet isPending={isPending} isError={isError} />
      <div ref={messagesEndRef} />
    </div>
  )
}

export { ChatMessagesContainer }
