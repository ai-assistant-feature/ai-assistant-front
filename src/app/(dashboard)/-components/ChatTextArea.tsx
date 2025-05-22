import { FC } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { UserPen, ArrowUp } from 'lucide-react'
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
  input: string
  setInput: (value: string | ((prev: string) => string)) => void
  isPending: boolean
  handleSend: () => void
}

export const ChatTextArea: FC<IProps> = ({ input, setInput, isPending, handleSend }) => {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='fixed bottom-0 left-0 right-0 bg-gray-50 p-4 border-t border-gray-200'
    >
      <div className='max-w-5xl mx-auto'>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chat.placeholder')}
          className='min-h-[56px] w-full resize-none rounded-2xl bg-white px-4 py-[1.3rem] focus-within:outline-none sm:text-sm'
        />

        <div className='flex justify-between mt-2'>
          <AlertDialog>
            <AlertDialogTrigger>
              <button
                type='button'
                disabled={isPending}
                className='bg-black rounded-full p-2 hover:bg-gray-800 transition disabled:opacity-50'
              >
                <UserPen className='text-white w-4 h-4' />
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

          <button
            type='submit'
            disabled={isPending}
            className='bg-black rounded-full p-2 hover:bg-gray-800 transition disabled:opacity-50'
          >
            <ArrowUp className='text-white w-4 h-4' />
          </button>
        </div>
      </div>
    </form>
  )
}
