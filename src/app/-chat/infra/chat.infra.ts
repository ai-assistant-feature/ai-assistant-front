// schemas
import { TAssistantResponse } from '@app/-chat/schemas/assistantResponce.schema'

export type TMessage = {
  role: 'user' | 'assistant'
  content: string | TAssistantResponse
}
