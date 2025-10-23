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
        <div className='absolute inset-0 p-2 flex items-start justify-between pointer-events-none'>
          <div className='flex gap-2 flex-wrap'>
            {flat.sale_status && (
              <span className='pointer-events-auto bg-background/80 text-foreground text-[10px] px-2 py-1 rounded-md border border-border'>
                {flat.sale_status}
              </span>
            )}
            {formattedCompletionDate && (
              <span className='pointer-events-auto bg-background/80 text-foreground text-[10px] px-2 py-1 rounded-md border border-border'>
                {formattedCompletionDate}
              </span>
            )}
            {flat.has_escrow && (
              <span className='pointer-events-auto bg-background/80 text-foreground text-[10px] px-2 py-1 rounded-md border border-border'>
                Escrow
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='p-3 bg-accent flex flex-col gap-1.5'>
        <h3 className='text-xl font-semibold text-primary line-clamp-1'>{flat.name}</h3>

        <div className='text-sm'>
          <span className='block'>{flat.area}</span>
        </div>

        <div className='text-sm'>
          <span className='block text-muted-foreground'>{t('property.developer')}:</span>
          <span className='block font-semibold'>{flat.developer}</span>
        </div>

        <div>
          <div className='text-sm text-muted-foreground'>{t('property.priceFrom')}</div>
          <div className='text-sm font-semibold text-foreground'>{formatted}</div>
        </div>
      </div>
    </div>
  )
}

export { ComplexCardComponent }
