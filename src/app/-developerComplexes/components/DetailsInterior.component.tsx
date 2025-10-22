import { TDeveloperComplex } from '@app/-common/schemas/developerComplex.schema'
import { useTranslation } from 'react-i18next'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const DetailsInteriorComponent = ({ developerObjectData }: IProps) => {
  const { t } = useTranslation()
  const images = developerObjectData.interior
  if (!images || images.length === 0) return null

  return (
    <div className='mb-4'>
      <h3 className='text-xl font-semibold mb-3'>{t('property.interior')}</h3>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
        {images.map((image, index) => (
          <div
            key={image.url ?? index}
            className='relative w-full h-28 sm:h-36 md:h-40 overflow-hidden rounded-md border border-border'
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
  )
}

export { DetailsInteriorComponent }
