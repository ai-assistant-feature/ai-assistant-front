import { useState } from 'react'
// api
import { useGptAskMutation } from '@app/-chat/api/sendGptMessage.mutation'
// interface
import { TMessage } from '@app/-chat/infra/chat.infra'
// components
import { ChatTextArea } from '@app/-chat/components/ChatTextArea'
import { ChatMessages } from '@app/-chat/components/ChatMessages'

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
      <div className='w-full md:max-w-[60%] relative flex flex-col items-center'>
        <div className='relative w-full'>
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
