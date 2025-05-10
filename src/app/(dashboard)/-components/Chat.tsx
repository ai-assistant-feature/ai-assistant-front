import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGptAskMutation } from '../-api/sendGptMessage.mutation'
import { Loader2, Send } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const Chat = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

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
      <div className='w-full bg-white rounded-2xl flex flex-col'>
        {/* Контейнер сообщений со скроллом */}
        <div className='flex-1 overflow-y-auto px-4 py-2 mb-16'>
          <div className='flex flex-col gap-3'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-100 self-end text-right'
                    : 'bg-gray-100 self-start text-left'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isPending && (
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <Loader2 className='animate-spin w-4 h-4' /> AI думает...
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </div>
      </div>

      {/* Форма фиксированная внизу */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className='fixed bottom-0 pb-8 pt-4 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex gap-2 z-50'
      >
        <Input
          className='flex-1'
          placeholder='Сообщение...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPending}
        />
        <Button type='submit' disabled={isPending}>
          <Send className='w-4 h-4' />
        </Button>
      </form>
    </>
  )
}

export { Chat }
