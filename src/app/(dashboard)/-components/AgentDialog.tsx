import { FC } from 'react'
import { UserPen } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useTranslation } from 'react-i18next'

interface IProps {
  isPending: boolean
}

const AgentDialog: FC<IProps> = ({ isPending }) => {
  const { t } = useTranslation()

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button
          type='button'
          disabled={isPending}
          className='text-white bg-black hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-black rounded-full p-1.5 transition-colors'
        >
          <UserPen className='w-4 h-4' />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('chat.writeToAgent')}</AlertDialogTitle>
          <AlertDialogDescription>{t('chat.agentHelp')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('common.close')}</AlertDialogCancel>
          <a
            href='https://t.me/ilnarshan'
            target='_blank'
            rel='noopener noreferrer'
            className='w-full'
          >
            <AlertDialogAction className='w-full'>{t('chat.goToAgent')}</AlertDialogAction>
          </a>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { AgentDialog }
