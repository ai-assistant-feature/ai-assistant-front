import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { useCurrency } from '@app/-common/context/CurrencyProvider'

interface FlatCardProps {
  flat: any
  setDeveloperId: any
}

//FIXME: flat.price_currency на это поле не будет ориентироваться
const ComplexCardComponent = ({ flat, setDeveloperId }: FlatCardProps) => {
  const { t } = useTranslation()
  const { format, currency } = useCurrency()
  const formatted = format(flat.min_price, { currency: (flat.price_currency as any) || currency })

  const completionDate = DateTime.fromISO(flat.completion_datetime, { zone: 'local' })

  // Формат: "декабрь 2027" (только месяц и год)
  const formattedCompletionDate = completionDate.toLocaleString({ month: 'long', year: 'numeric' })

  return (
    <div
      onClick={() => setDeveloperId(flat.id)}
      className='bg-background overflow-hidden cursor-pointer rounded-lg border border-border'
    >
      <div className='relative h-40'>
        <img
          src={flat.cover_image_url?.url}
          alt={flat.title}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='p-3 bg-accent flex flex-col gap-1.5'>
        <h3 className='text-base font-semibold text-primary line-clamp-1'>{flat.name}</h3>

        <div className='text-sm'>
          <span className='block'>{flat.area}</span>
        </div>

        <div className='text-sm text-muted-foreground'>
          <span className='block font-medium'>{t('property.developer')}:</span>
          <span className='block'>{flat.developer}</span>
        </div>

        <div className='text-sm text-muted-foreground'>
          <span className='block font-medium'>{t('property.completionDate')}:</span>
          <span className='block capitalize'>{formattedCompletionDate}</span>
        </div>

        <div className='pt-2 text-sm font-semibold text-foreground'>{formatted}</div>
      </div>
    </div>
  )
}

export { ComplexCardComponent }
