import { useMutation } from '@tanstack/react-query'
import { getSessionId } from '@app/-common/helpers/getSessionId'
import { TGPTApiResponse } from '../schemas/gptResponce.schema'
import { toast } from 'sonner'
import { httpService } from '@/helpers/api'
interface AskVariables {
  question: string
  metadata?: Record<string, unknown>
}

export const useGptAskMutation = () => {
  return useMutation<any, Error, AskVariables>({
    mutationFn: async ({ question, metadata }) => {
      const payload = {
        message: question,
        metadata: {
          ...(metadata ?? {}),
          sessionId: getSessionId(),
        },
      }

      const response = await httpService.post<TGPTApiResponse>('/chat/message', payload, {
        headers: { 'Content-Type': 'application/json' },
      })

      // mapper

      return response.data.data
    },

    onError: (error) => {
      toast.error('Ошибка при запросе к GPT:')
      console.error('Ошибка при запросе к GPT:', error)
    },
  })
}

//ВСЕ ДАННЫЕ получаем в таком ввиде
// has_escrow
