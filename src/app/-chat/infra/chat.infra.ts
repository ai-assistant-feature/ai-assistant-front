import { TGPTApiResponse } from '../schemas/gptResponce.schema'

export type TMessage = {
  role: 'user' | 'assistant'
  content: string | TGPTApiResponse
}
