import { useEffect, useRef, useState } from 'react'
import { useGptAskMutation } from '../-api/sendGptMessage.mutation'
import { Loader2 } from 'lucide-react'
import { ChatTextArea } from './ChatTextArea'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const Chat = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Спросите меня о жилье — я помогу',
    },
  ])

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { mutate, isPending } = useGptAskMutation()

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])

    mutate(
      { question: input },
      {
        onSuccess: (res) => {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: res?.answer,
            },
          ])
        },
      },
    )

    setInput('')
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isPending])

  return (
    <>
      <div className='w-full flex flex-col'>
        <div className='flex-1 overflow-y-auto mb-24'>
          <div className='flex flex-col gap-3'>
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={` py-2  text-sm whitespace-pre-wrap break-words ${
                    msg.role === 'user'
                      ? 'bg-gray-100 self-end text-right max-w-[75%]'
                      : 'bg-white self-start text-left w-full'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </motion.div>
              ))}
            </AnimatePresence>

            {isPending && (
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <Loader2 className='animate-spin w-4 h-4' /> AI думает...
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>
      </div>

      <ChatTextArea
        input={input}
        setInput={setInput}
        isPending={isPending}
        handleSend={handleSend}
      />
    </>
  )
}

export { Chat }
