import { useState } from 'react'
import { useGptAskMutation } from '@app/-chat/api/sendGptMessage.mutation'
import { TMessage } from '@app/-chat/infra/chat.infra'

export const useChat = () => {
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

  return {
    input,
    setInput,
    messages,
    isPending,
    handleSend,
  }
}
