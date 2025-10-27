import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import { useTranslation } from 'react-i18next'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const DetailsInteriorComponent = ({ developerObjectData }: IProps) => {
  const { t } = useTranslation()
  const images = developerObjectData.interior
  if (!images || images.length === 0) return null

  return (
    <>
      <h3 className='text-2xl font-semibold mb-3 mt-12'>{t('property.interior')}</h3>
      <div className='mb-4 overflow-x-auto scrollbar-hide'>
        <div className='flex gap-3 snap-x snap-mandatory pb-2'>
          {images.map((image, index) => (
            <div
              key={image.url ?? index}
              className='rounded-md border border-border overflow-hidden bg-accent flex-shrink-0 snap-start min-w-[260px] max-w-[280px]'
            >
              <img
                src={image.url}
                alt={`${t('property.interior')} ${index + 1}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export { DetailsInteriorComponent }
