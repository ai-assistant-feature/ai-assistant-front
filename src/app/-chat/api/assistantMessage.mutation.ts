import { useMutation } from '@tanstack/react-query'
import { getSessionId } from '@app/-common/helpers/getSessionId'
import { toast } from 'sonner'
import { httpService } from '@/helpers/api'
// schemas
import { TAssistantResponse } from '@app/-chat/schemas/assistantResponce.schema'
interface AskVariables {
  question: string
  metadata?: Record<string, unknown>
}

export const useAssistantMessageMutation = () => {
  return useMutation<any, Error, AskVariables>({
    mutationFn: async ({ question }) => {
      const payload = {
        message: question,
        sessionId: getSessionId(),
      }

      const response = await httpService.post<TAssistantResponse>('/api/v1/chat/message', payload, {
        headers: { 'Content-Type': 'application/json' },
      })

      return response.data
    },

    onError: (error) => {
      toast.error('Ошибка при запросе к GPT:')
      console.error('Ошибка при запросе к GPT:', error)
    },
  })
}

//ВСЕ ДАННЫЕ получаем в таком ввиде
// has_escrow
