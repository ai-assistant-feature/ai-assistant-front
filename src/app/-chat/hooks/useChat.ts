import { useState } from 'react'
import { useGptAskMutation } from '@app/-chat/api/sendGptMessage.mutation'
import { TMessage } from '@app/-chat/infra/chat.infra'

export const useChat = () => {
  const [messages, setMessages] = useState<TMessage[]>([])

  const { mutate, isPending, isError } = useGptAskMutation()

  const handleSend = (value: string) => {
    if (!value.trim()) return

    const userMessage: TMessage = {
      role: 'user',
      content: value,
    }

    setMessages((prev) => [...prev, userMessage])

    mutate(
      { question: value },
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
  }

  return {
    messages,
    isPending,
    isError,
    handleSend,
  }
}
