import { FC } from 'react'
import { ArrowUp } from 'lucide-react'
// components
import { AgentDialog } from '@app/-chat/components/AgentDialog'

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
        <button type='submit' disabled={isDisabled || isPending} onClick={onSubmit}>
          <ArrowUp className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}
