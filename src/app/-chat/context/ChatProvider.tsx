import { createContext, FC, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { useAssistantMessageMutation } from '@app/-chat/api/assistantMessage.mutation'
import { TMessage } from '@app/-chat/infra/chat.infra'
import { TAssistantResponse } from '@app/-chat/schemas/assistantResponce.schema'

type ChatContextValue = {
  chatId: string
  messages: TMessage[]
  isPending: boolean
  isError: boolean
  shouldShowQuickQuestions: boolean
  handleSend: (value: string, options?: { buttonId?: string }) => void
  startNewChat: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

const generateChatId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `chat_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

interface IProps {
  children: ReactNode
}

export const ChatProvider: FC<IProps> = ({ children }) => {
  const [chatId, setChatId] = useState<string>(() => generateChatId())
  const [messages, setMessages] = useState<TMessage[]>([])
  const [shouldShowQuickQuestions, setShouldShowQuickQuestions] = useState<boolean>(true)

  const { mutate, isPending, isError } = useAssistantMessageMutation()

  const handleSend = useCallback(
    (value: string, options?: { buttonId?: string }) => {
      if (!value.trim()) return

      setShouldShowQuickQuestions(false)

      const userMessage: TMessage = {
        role: 'user',
        content: value,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, userMessage])

      mutate(
        { question: value, buttonId: options?.buttonId, chatId },
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
    },
    [chatId, mutate],
  )

  const startNewChat = useCallback(() => {
    setChatId(generateChatId())
    setMessages([])
    setShouldShowQuickQuestions(true)
  }, [])

  const value = useMemo<ChatContextValue>(
    () => ({
      chatId,
      messages,
      isPending,
      isError,
      shouldShowQuickQuestions,
      handleSend,
      startNewChat,
    }),
    [chatId, messages, isPending, isError, shouldShowQuickQuestions, handleSend, startNewChat],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChatContext = (): ChatContextValue => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider')
  return ctx
}
