import { Check } from 'lucide-react'
import { FC } from 'react'
import { Drawer } from '@/components/client/Drawer'
import { useTranslation } from 'react-i18next'
import { CURRENCIES, CurrencyCode } from '@app/-common/context/CurrencyProvider'

interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCurrencyChange: (currency: CurrencyCode) => void
  currentCurrency: CurrencyCode
}

const CurrencyDrawer: FC<IProps> = ({
  isOpen,
  onOpenChange,
  onCurrencyChange,
  currentCurrency,
}) => {
  const { t } = useTranslation()

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} title={t('sidebar.selectCurrency')}>
      {Object.entries(CURRENCIES).map(([code, name]) => (
        <button
          key={code}
          className='flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors'
          onClick={() => onCurrencyChange(code as CurrencyCode)}
        >
          <span className='text-foreground'>{name}</span>
          {currentCurrency === code && <Check className='w-4 h-4 text-primary' />}
        </button>
      ))}
    </Drawer>
  )
}

export { CurrencyDrawer }
