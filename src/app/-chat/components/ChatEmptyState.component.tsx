import { MessageSquareMore } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ChatEmptyStateComponent = () => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col items-center justify-center text-center text-muted-foreground px-4 mt-40 mb-10'>
      <MessageSquareMore className='w-6 h-6 mb-2 text-muted-foreground' />
      <h2 className='text-sm font-semibold mb-2'>{t('chat.emptyState.title')}</h2>
      <p className='text-xs text-muted-foreground'>{t('chat.emptyState.description')}</p>
    </div>
  )
}

export { ChatEmptyStateComponent }
