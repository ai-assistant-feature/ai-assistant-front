import { useState } from 'react'
import { Drawer } from 'vaul'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const messages = [
  { role: 'user', content: 'Привет! Какие апартаменты вы можете порекомендовать?' },
  {
    role: 'ai',
    content: 'Здравствуйте! Уточните, пожалуйста, город или район, который вас интересует.',
  },
  { role: 'user', content: 'Центр города, до 15 млн.' },
  { role: 'ai', content: 'Есть несколько вариантов. Хотите посмотреть на них?' },
]

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

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

          {/* Scrollable message area */}
          <div className='flex-1 overflow-y-auto pr-2'>
            <div className='flex flex-col gap-4'>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-100 self-end text-right'
                      : 'bg-gray-100 self-start text-left'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
          </div>

          {/* Input area */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!input.trim()) return
              // Тут можно добавить отправку сообщения
              setInput('')
            }}
            className='mt-4 flex gap-2'
          >
            <Input
              className='flex-1'
              placeholder='Введите сообщение...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type='submit'>Отправить</Button>
          </form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export { Chat }
