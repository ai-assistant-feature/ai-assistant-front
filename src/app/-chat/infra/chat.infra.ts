import { IGPTResponse } from './gptResponce.infra'

export type TMessage = {
  role: 'user' | 'assistant'
  content: string | IGPTResponse
}
