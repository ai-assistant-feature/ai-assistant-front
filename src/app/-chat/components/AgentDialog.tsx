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
      <AlertDialogTrigger asChild>
        <button type='button' disabled={isPending}>
          <UserPen className='w-6 h-6' />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('chat.writeToAgent')}</AlertDialogTitle>
          <AlertDialogDescription>{t('chat.agentHelp')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('common.close')}</AlertDialogCancel>
          <AlertDialogAction asChild className='w-full'>
            <a
              href='https://t.me/ilnarshan'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full'
            >
              {t('chat.goToAgent')}
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { AgentDialog }
