import { useMutation } from '@tanstack/react-query'

type GptRequest = {
  question: string
}

type GptResponse = {
  answer: string
}

const useGptAskMutation = () => {
  return useMutation<GptResponse, Error, GptRequest>({
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

      return response.json()
    },
  })
}

export { useGptAskMutation }
