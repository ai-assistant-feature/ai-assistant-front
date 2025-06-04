import { MessageSquareMore } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, useRef } from 'react'
import { TMessage } from '@app/-chat/infra/chat.infra'
import { useTranslation } from 'react-i18next'

import { UserMessage } from './messages/UserMessage'
import { GPTMessage } from './messages/GPTMessage'

interface IProps {
  messages: TMessage[]
  isPending: boolean
}

const EmptyState = () => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col items-center justify-center text-center text-zinc-500 px-4 mt-40 mb-10'>
      <MessageSquareMore className='w-6 h-6 mb-2 text-zinc-400' />
      <h2 className='text-sm font-semibold mb-2'>{t('chat.emptyState.title')}</h2>
      <p className='text-xs text-zinc-400'>{t('chat.emptyState.description')}</p>
    </div>
  )
}

const LoadingState = () => {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='py-2 text-sm text-gray-500'
    >
      {t('common.loading')}
    </motion.div>
  )
}

const MessageItem = ({ msg }: { msg: TMessage }) => {
  return msg.role === 'user' ? (
    <UserMessage content={msg.content} />
  ) : (
    <GPTMessage content={msg.content} />
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

const ChatMessages: FC<IProps> = ({ messages, isPending }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.length === 0 ? <EmptyState /> : <MessageList messages={messages} />}
      {isPending && <LoadingState />}
      <div ref={messagesEndRef} />
    </div>
  )
}

export { ChatMessages }
