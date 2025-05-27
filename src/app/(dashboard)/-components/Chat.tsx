import { useState } from 'react'
import { useGptAskMutation } from '../-api/sendGptMessage.mutation'
import { ChatTextArea } from './ChatTextArea'
import { ChatMessages } from './ChatMessages'
import { TMessage } from '../-infra/chat.infra'

const Chat = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<TMessage[]>([])

  const { mutate, isPending } = useGptAskMutation()

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: TMessage = {
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

  return (
    <div className='min-h-full w-full flex justify-center'>
      <div className='w-full md:max-w-[60%] relative'>
        <div className='relative'>
          <ChatMessages messages={messages} isPending={isPending} />
          <ChatTextArea
            input={input}
            setInput={setInput}
            isPending={isPending}
            handleSend={handleSend}
          />
        </div>
      </div>
    </div>
  )
}

export { Chat }
