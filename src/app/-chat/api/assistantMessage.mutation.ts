import { useMutation } from '@tanstack/react-query'
import { getSessionId } from '@app/-common/helpers/getSessionId'
import { toast } from 'sonner'
import { httpService } from '@/helpers/api'
// schemas
import { TAssistantResponse } from '@app/-chat/schemas/assistantResponce.schema'
interface AskVariables {
  question: string
  metadata?: Record<string, unknown>
  buttonId?: string
  chatId: string
}

function isLatin1HeaderSafe(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const ch = value[i]
    const code = value.charCodeAt(i)
    if (ch === '\r' || ch === '\n' || code > 0xff) return false
  }
  return true
}

export const useAssistantMessageMutation = () => {
  return useMutation<TAssistantResponse, Error, AskVariables>({
    mutationFn: async ({ question, buttonId, chatId }) => {
      type Payload = {
        message: string
        sessionId: string | null
        chatId: string
        buttonId?: string
      }

      const payload: Payload = {
        message: question,
        sessionId: getSessionId(),
        chatId,
      }

      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (buttonId) {
        if (isLatin1HeaderSafe(buttonId)) {
          headers['X-Button'] = buttonId
        } else {
          payload.buttonId = buttonId
        }
      }

      const response = await httpService.post<TAssistantResponse>('/api/v1/chat/message', payload, {
        headers,
      })

      return response.data
    },

    onError: (error) => {
      toast.error('Ошибка при запросе к GPT:')
      console.error('Ошибка при запросе к GPT:', error)
    },
  })
}
