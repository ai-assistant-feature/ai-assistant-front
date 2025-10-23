import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { useTranslation } from 'react-i18next'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CURRENCIES, CurrencyCode } from '@app/-common/context/CurrencyProvider'

interface CurrencyPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentCurrency: CurrencyCode
  onCurrencyChange: (currency: CurrencyCode) => void
}

const CurrencyPopup = ({
  open,
  onOpenChange,
  currentCurrency,
  onCurrencyChange,
}: CurrencyPopupProps) => {
  const { t } = useTranslation()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex items-center justify-between'>
            <div></div>
            <div className='text-lg font-semibold text-foreground'>{t('sidebar.currency')}</div>
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
          {Object.entries(CURRENCIES).map(([code, name]) => (
            <button
              key={code}
              className='flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors'
              onClick={() => {
                onCurrencyChange(code as CurrencyCode)
                onOpenChange(false)
              }}
            >
              <span className='text-foreground'>{name}</span>
              {currentCurrency === code && <Check className='w-4 h-4 text-primary' />}
            </button>
          ))}
        </div>

        <AlertDialogFooter />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { CurrencyPopup }
