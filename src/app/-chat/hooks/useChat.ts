import { useState } from 'react'
// api
import { useAssistantMessageMutation } from '@app/-chat/api/assistantMessage.mutation'
import { TMessage } from '@app/-chat/infra/chat.infra'
// schemas
import { TAssistantResponse } from '@app/-chat/schemas/assistantResponce.schema'

//TODO: TMessage это массив сообещений юзера и ассистента
export const useChat = () => {
  const [messages, setMessages] = useState<TMessage[]>([])

  const { mutate, isPending, isError } = useAssistantMessageMutation()

  const handleSend = (value: string, options?: { buttonId?: string }) => {
    if (!value.trim()) return

    const userMessage: TMessage = {
      role: 'user',
      content: value,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])

    mutate(
      { question: value, buttonId: options?.buttonId },
      {
        onSuccess: (res: TAssistantResponse) => {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: res,
              timestamp: Date.now(),
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
