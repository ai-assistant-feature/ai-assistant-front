import { ChatTextArea } from '@app/-chat/containers/ChatTextArea'
import { ChatMessages } from '@app/-chat/containers/ChatMessages'
import { useChat } from '@app/-chat/hooks/useChat'
import { useState } from 'react'

const Chat = () => {
  const { messages, isPending, handleSend, isError } = useChat()
  const [inputHeight, setInputHeight] = useState(0)

  return (
    <div className='min-h-full w-full flex justify-center px-4'>
      <div className='w-full md:max-w-[60%] relative flex flex-col items-center'>
        <div className='relative w-full'>
          <ChatMessages
            messages={messages}
            isPending={isPending}
            isError={isError}
            inputHeight={inputHeight}
          />
          <ChatTextArea
            isPending={isPending}
            handleSend={handleSend}
            onHeightChange={setInputHeight}
          />
        </div>
      </div>
    </div>
  )
}

export { Chat }
