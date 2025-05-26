import { MessageSquareMore } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'
import { TMessage } from '../-infra/chat.infra'
import { useTranslation } from 'react-i18next'
import { YandexMap } from './YandexMap'

interface IProps {
  messages: TMessage[]
  isPending: boolean
}

const ChatMessages: FC<IProps> = ({ messages, isPending }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isPending])

  return (
    <div className='w-full flex flex-col mt-24'>
      <div className='flex-1 overflow-y-auto mb-24'>
        <div className='flex flex-col gap-3'>
          {messages.length === 0 && !isPending && (
            <div className='flex flex-col items-center justify-center text-center text-zinc-500 mt-20 px-4'>
              <MessageSquareMore className='w-6 h-6 mb-2 text-zinc-400' />
              <h2 className='text-sm font-semibold mb-2'>{t('chat.emptyState.title')}</h2>
              <p className='text-xs text-zinc-400'>{t('chat.emptyState.description')}</p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => {
              const address = msg.role === 'assistant' ? 'Дубай Молл' : null

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`py-2 text-sm whitespace-pre-wrap break-words rounded-lg ${
                    msg.role === 'user'
                      ? 'px-4 bg-gray-100 self-end text-right max-w-[75%]'
                      : 'bg-white self-start text-left w-full'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                  {address && <YandexMap address={address} />}
                </motion.div>
              )
            })}
          </AnimatePresence>

          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='py-2 text-sm text-gray-500'
            >
              {t('common.loading')}
            </motion.div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>
    </div>
  )
}

export { ChatMessages }
