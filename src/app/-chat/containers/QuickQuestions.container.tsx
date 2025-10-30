import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getQuickQuestions } from '../constants/quickQuestions'
import { useGetSupportedBtnsQuery } from '../api/getSupportedBtns.query'
import { ActionButtonSchema } from '../schemas/assistantResponce.schema'
import { z } from 'zod'

interface IProps {
  handleSend: (value: string, options?: { buttonId?: string }) => void
  actionButtons?: Array<z.infer<typeof ActionButtonSchema>>
}

export const QuickQuestions: FC<IProps> = ({ handleSend, actionButtons }) => {
  const [dismissed, setDismissed] = useState(false)
  const { t } = useTranslation()
  const quickQuestions = getQuickQuestions(t)
  const { data: btns } = useGetSupportedBtnsQuery()

  const supportedIds = btns?.supported_btns?.map((b) => b.btn_id) ?? []
  const hasServerButtons = (actionButtons?.length ?? 0) > 0
  const visibleQuestions =
    supportedIds.length > 0
      ? quickQuestions.filter((q) => supportedIds.includes(q.id))
      : quickQuestions

  const buttonsKey = useMemo(
    () =>
      actionButtons && actionButtons.length > 0 ? actionButtons.map((b) => b.btn_id).join('|') : '',
    [actionButtons],
  )

  useEffect(() => {
    // Когда прилетает новый набор кнопок — снова показываем
    if (hasServerButtons) setDismissed(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonsKey])

  if (hasServerButtons && dismissed) return null

  return (
    <div className='w-full overflow-x-auto pb-4 px-2 scrollbar-hide'>
      <div className='flex gap-2 w-max'>
        {hasServerButtons
          ? actionButtons!.map((b) => (
              <button
                key={b.btn_id}
                type='button'
                className='flex flex-col px-4 py-2 rounded-2xl bg-accent hover:bg-accent/80 transition w-auto max-w-[240px] text-left'
                onClick={() => {
                  handleSend(b.text, { buttonId: b.btn_id })
                  setDismissed(true)
                }}
              >
                <div className='text-sm font-bold truncate self-start text-accent-foreground'>
                  {b.title}
                </div>
                <div className='text-muted-foreground text-xs leading-tight truncate w-full'>
                  {b.text}
                </div>
              </button>
            ))
          : visibleQuestions.map((q) => (
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
