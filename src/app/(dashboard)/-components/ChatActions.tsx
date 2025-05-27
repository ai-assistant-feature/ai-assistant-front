import { FC } from 'react'
import { ArrowUp } from 'lucide-react'
import { AgentDialog } from './AgentDialog'

interface IChatActionsProps {
  isPending: boolean
  isDisabled: boolean
  onSubmit: () => void
}

export const ChatActions: FC<IChatActionsProps> = ({ isPending, isDisabled, onSubmit }) => {
  return (
    <div className='flex items-center gap-2 left-3 right-3 bottom-2.5'>
      <div>
        <AgentDialog isPending={isPending} />
      </div>
      <div className='ml-auto'>
        <button
          type='submit'
          disabled={isDisabled || isPending}
          onClick={onSubmit}
          className='text-white bg-black hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-black rounded-full p-1.5 transition-colors'
        >
          <ArrowUp className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}
