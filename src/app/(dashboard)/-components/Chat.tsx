import { useEffect, useRef, useState } from 'react'
import { Drawer } from 'vaul'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGptAskMutation } from '../-api/sendGptMessage.mutation'
import { Loader2 } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const { mutate, data, isPending } = useGptAskMutation()

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
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <div className='mt-8'>
          <Card>
            <CardHeader>
              <CardTitle>Найти апартаменты</CardTitle>
              <CardDescription>Спросите AI-ассистента</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className='w-full'>Открытый диалог с AI</Button>
            </CardContent>
          </Card>
        </div>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/50' />
        <Drawer.Content className='fixed bottom-0 left-0 right-0 h-[95vh] bg-white rounded-t-2xl p-6 shadow-lg flex flex-col'>
          <div className='w-12 h-1.5 bg-gray-400 rounded-full mx-auto mb-4' />
          <Drawer.Title className='text-lg font-semibold text-center mb-2'>Чат с AI</Drawer.Title>

          {/* Сообщения */}
          <div className='flex-1 overflow-y-auto pr-2'>
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

          {/* Инпут */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className='mt-4 flex gap-2'
          >
            <Input
              className='flex-1'
              placeholder='Введите сообщение...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPending}
            />
            <Button type='submit' disabled={isPending}>
              Отправить
            </Button>
          </form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export { Chat }
