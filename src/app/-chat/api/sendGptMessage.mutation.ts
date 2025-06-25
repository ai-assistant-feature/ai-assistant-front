import { useMutation } from '@tanstack/react-query'
import { IGPTResponse } from '@app/-chat/infra/gptResponce.infra'
import {
  validateGptMessageResponse,
  safeValidateGptMessageResponse,
} from '@app/-chat/infra/gptMessage.infra'

type GptRequest = {
  question: string
}

const useGptAskMutation = () => {
  return useMutation<IGPTResponse, Error, GptRequest>({
    mutationFn: async ({ question }) => {
      const response = await fetch('https://nest-dubai.onrender.com/gpt/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.statusText}`)
      }

      const data = await response.json()

      // Валидация ответа с помощью Zod
      const validatedData = validateGptMessageResponse(data)

      return validatedData
    },
  })
}

export { useGptAskMutation }
