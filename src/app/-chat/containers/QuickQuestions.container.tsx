import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getQuickQuestions } from '../constants/quickQuestions'
import { useGetSupportedBtnsQuery } from '../api/getSupportedBtns.query'

interface IProps {
  handleSend: (value: string, options?: { buttonId?: string }) => void
}

export const QuickQuestions: FC<IProps> = ({ handleSend }) => {
  const { t } = useTranslation()
  const quickQuestions = getQuickQuestions(t)
  const { data: btns } = useGetSupportedBtnsQuery()

  const supportedIds = btns?.supported_btns?.map((b) => b.btn_id) ?? []
  const visibleQuestions =
    supportedIds.length > 0
      ? quickQuestions.filter((q) => supportedIds.includes(q.id))
      : quickQuestions

  return (
    <div className='w-full overflow-x-auto pb-4 px-2 scrollbar-hide'>
      <div className='flex gap-2 w-max'>
        {visibleQuestions.map((q) => (
          <button
            key={q.id}
            type='button'
            className='flex flex-col px-4 py-2 rounded-2xl bg-accent hover:bg-accent/80 transition w-auto max-w-[200px]'
            onClick={() => handleSend(q.value, { buttonId: q.id })}
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
