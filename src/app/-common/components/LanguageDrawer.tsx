import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import { Drawer } from '@/components/client/Drawer'

const LANGUAGES = {
  en: 'English',
  ru: 'Русский',
} as const

interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onLanguageChange: (lang: keyof typeof LANGUAGES) => void
  currentLanguage: string
}

const LanguageDrawer: FC<IProps> = ({
  isOpen,
  onOpenChange,
  onLanguageChange,
  currentLanguage,
}) => {
  const { t } = useTranslation()

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} title={t('sidebar.selectLanguage')}>
      {Object.entries(LANGUAGES).map(([code, name]) => (
        <button
          key={code}
          className='flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100'
          onClick={() => onLanguageChange(code as keyof typeof LANGUAGES)}
        >
          <span>{name}</span>
          {currentLanguage === code && <Check className='w-4 h-4 text-green-500' />}
        </button>
      ))}
    </Drawer>
  )
}

export { LanguageDrawer }
