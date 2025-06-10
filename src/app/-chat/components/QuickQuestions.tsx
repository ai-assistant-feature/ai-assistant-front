import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getQuickQuestions } from '../constants/quickQuestions'

interface QuickQuestionsProps {
  handleSend: (value: string) => void
}

export const QuickQuestions: FC<QuickQuestionsProps> = ({ handleSend }) => {
  const { t } = useTranslation()
  const quickQuestions = getQuickQuestions(t)

  return (
    <div className='w-full overflow-x-auto pb-4 px-2 scrollbar-hide'>
      <div className='flex gap-2 w-max'>
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            type='button'
            className='flex flex-col px-4 py-2 rounded-2xl bg-accent hover:bg-accent/80 transition w-auto max-w-[200px]'
            onClick={() => handleSend(q.value)}
          >
            <div className='text-sm font-bold truncate self-start text-accent-foreground'>
              {q.title}
            </div>
            <div className='text-muted-foreground text-xs leading-tight truncate w-full'>
              {q.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
