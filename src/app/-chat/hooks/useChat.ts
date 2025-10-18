import { useState } from 'react'
import { useGptAskMutation } from '@app/-chat/api/sendGptMessage.mutation'
import { TMessage } from '@app/-chat/infra/chat.infra'

//TODO: TMessage это массив сообещений юзера и ассистента
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
              content: res,
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
