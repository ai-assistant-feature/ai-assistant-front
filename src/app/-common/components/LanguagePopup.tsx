import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { useTranslation } from 'react-i18next'
import { Check, X } from 'lucide-react'
import { LANGUAGES } from '@app/-common/constants/sidebar'
import { Button } from '@/components/ui/button'

interface LanguagePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentLanguage: string
  onLanguageChange: (lang: keyof typeof LANGUAGES) => void
}

const LanguagePopup = ({
  open,
  onOpenChange,
  currentLanguage,
  onLanguageChange,
}: LanguagePopupProps) => {
  const { t } = useTranslation()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex items-center justify-between'>
            <div></div>
            <div className='text-lg font-semibold'>{t('sidebar.language')}</div>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={() => onOpenChange(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </AlertDialogHeader>

        <div className='flex flex-col gap-1'>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <button
              key={code}
              className='flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100'
              onClick={() => {
                onLanguageChange(code as keyof typeof LANGUAGES)
                onOpenChange(false)
              }}
            >
              <span>{name}</span>
              {currentLanguage === code && <Check className='w-4 h-4 text-green-500' />}
            </button>
          ))}
        </div>

        <AlertDialogFooter />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { LanguagePopup }
