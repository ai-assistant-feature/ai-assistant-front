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

export const useAssistantMessageMutation = () => {
  return useMutation<any, Error, AskVariables>({
    mutationFn: async ({ question, buttonId, chatId }) => {
      const payload = {
        message: question,
        sessionId: getSessionId(),
        chatId,
      }

      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (buttonId) headers['X-Button'] = buttonId

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
