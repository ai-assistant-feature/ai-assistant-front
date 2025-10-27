import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import { useTranslation } from 'react-i18next'
import { useCurrency } from '@app/-common/context/CurrencyProvider'
import { useGetExchangeRatesQuery } from '@app/-common/api/getExchangeRates.query'
import { Separator } from '@/components/ui/separator'

interface UnitBlocksProps {
  developerObjectData: TDeveloperComplex
}

const toNumber = (value?: number | string | null) => {
  if (value === null || value === undefined) return undefined
  const num = typeof value === 'number' ? value : parseFloat(value)
  if (Number.isNaN(num)) return undefined
  return num
}

const DetailsUnitBlocksComponent = ({ developerObjectData }: UnitBlocksProps) => {
  const { t } = useTranslation()
  const { format, currency } = useCurrency()
  const { data: exchangeRates } = useGetExchangeRatesQuery()
  const exchangeRate = exchangeRates[currency] || 1
  const blocks = developerObjectData.unit_blocks
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      <h3 className='text-2xl font-semibold mb-3 mt-12'>{t('property.layouts')}</h3>

      <div className='mb-4 overflow-x-auto scrollbar-hide'>
        <div className='flex gap-3 snap-x snap-mandatory pb-2'>
          {blocks.map((block) => {
            const imageUrl = Array.isArray(block.typical_unit_image_url)
              ? block.typical_unit_image_url[0]?.url
              : undefined

            const formattedPriceForm = format(
              (toNumber(block.units_price_from) ?? 0) / exchangeRate,
              {
                currency: exchangeRate?.currency,
              },
            )

            return (
              <div
                key={block.id}
                className='rounded-md border border-border overflow-hidden bg-accent flex-shrink-0 snap-start min-w-[260px] max-w-[280px]'
              >
                {imageUrl && (
                  <div className='relative w-full h-36 sm:h-40 md:h-44 border-b border-border'>
                    <img
                      src={imageUrl}
                      alt={block.name ?? ''}
                      className='w-full h-full object-cover'
                    />
                  </div>
                )}
                <div className='p-3 flex flex-col gap-1.5'>
                  <div className='text-base font-semibold text-primary line-clamp-2'>
                    {block.name}
                  </div>

                  <div className='flex flex-wrap gap-1.5'>
                    {block?.unit_bedrooms && (
                      <span className='inline-flex items-center rounded-md bg-white px-2 py-0.5 text-xs text-muted-foreground'>
                        {block.unit_bedrooms}
                      </span>
                    )}
                    {block?.unit_type && (
                      <span className='inline-flex items-center rounded-md bg-white px-2 py-0.5 text-xs text-muted-foreground'>
                        {block.unit_type}
                      </span>
                    )}
                  </div>

                  <Separator className='my-2' />
                  <div className=' py-3 flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>{t('property.priceFrom')}</span>
                    <span className='text-sm font-semibold text-primary'>
                      {formattedPriceForm ?? '—'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export { DetailsUnitBlocksComponent }
