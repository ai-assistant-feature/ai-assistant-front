import { FC } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'

interface IChatInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const ChatInput: FC<IChatInputProps> = ({ value, onChange, placeholder, className }) => {
  const { t } = useTranslation()

  return (
    <Textarea
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || t('chat.placeholder')}
      className={`
        w-full
        resize-none
        overflow-y-auto
        max-h-[9em]  // 6 строк при line-height 1.5em
        border-none shadow-none
        focus:shadow-none focus:outline-none focus:ring-0 focus:border-none
        focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none
        p-0
        pt-2
        pb-2
        ${className || ''}
      `}
    />
  )
}
