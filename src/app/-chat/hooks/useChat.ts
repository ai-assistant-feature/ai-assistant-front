import { useChatContext } from '@app/-chat/context/ChatProvider'

export const useChat = () => {
  return useChatContext()
}
