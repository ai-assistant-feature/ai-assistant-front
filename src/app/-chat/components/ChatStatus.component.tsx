import { FC } from 'react'
// components
import { ChatLoading } from '@app/-chat/components/ChatLoading'

interface IProps {
  isPending: boolean
  isError: boolean
}

const ChatStatusComponet: FC<IProps> = ({ isPending, isError }) => (
  <>
    {isPending && <ChatLoading />}
    {isError && (
      <div className='p-4 text-destructive bg-destructive/10 rounded-lg m-4'>
        Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.
      </div>
    )}
  </>
)

export { ChatStatusComponet }
