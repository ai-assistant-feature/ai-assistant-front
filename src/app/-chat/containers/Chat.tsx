import { ChatTextArea } from '@app/-chat/components/ChatTextArea'
import { ChatMessages } from '@app/-chat/components/ChatMessages'
import { useChat } from '@app/-chat/hooks/useChat'

const Chat = () => {
  const { input, setInput, messages, isPending, handleSend, isError } = useChat()

  return (
    <div className='min-h-full w-full flex justify-center px-4'>
      <div className='w-full md:max-w-[60%] relative flex flex-col items-center'>
        <div className='relative w-full'>
          <ChatMessages messages={messages} isPending={isPending} isError={isError} />
          <ChatTextArea
            input={input}
            setInput={setInput}
            isPending={isPending}
            handleSend={handleSend}
          />
        </div>
      </div>
    </div>
  )
}

export { Chat }
