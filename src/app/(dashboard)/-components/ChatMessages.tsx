import { Loader2, MessageSquareMore } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'
import { TMessage } from '../-infra/chat.infra'

interface IProps {
  messages: TMessage[]
  isPending: boolean
}

const ChatMessages: FC<IProps> = ({ messages, isPending }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

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
              <h2 className='text-sm font-semibold mb-2'>Найди жильё с помощью AI</h2>
              <p className='text-xs text-zinc-400'>
                Просто напиши, что ты ищешь — и наш искусственный интеллект подберёт лучшие варианты
                в Дубае и других городах.
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
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
              </motion.div>
            ))}
          </AnimatePresence>

          {isPending && (
            <div className='flex items-center gap-2 text-sm text-gray-500 pl-1'>
              <span className='flex gap-[2px]'>
                <span className='w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                <span className='w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></span>
                <span className='w-1.5 h-1.5 bg-black rounded-full animate-bounce'></span>
              </span>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>
    </div>
  )
}

export { ChatMessages }
