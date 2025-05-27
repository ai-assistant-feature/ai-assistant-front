import { FC } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'

interface IChatInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const ChatInput: FC<IChatInputProps> = ({ value, onChange, placeholder }) => {
  const { t } = useTranslation()

  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || t('chat.placeholder')}
      className='w-full resize-none border-none shadow-none focus:shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none'
      style={{ maxHeight: '200px', height: '102px', overflowY: 'hidden' }}
    />
  )
}
