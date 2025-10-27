import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import { useTranslation } from 'react-i18next'
import { Building2, MapPin } from 'lucide-react'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const DetailsDeveloperComponent = ({ developerObjectData }: IProps) => {
  const { t } = useTranslation()
  const { developer, area } = developerObjectData

  if (!developer && !area) return null

  return (
    <div>
      {developer && (
        <div className='flex items-start gap-3 p-2'>
          <div className='rounded-md bg-muted text-muted-foreground p-2'>
            <Building2 className='h-6 w-6' />
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-muted-foreground'>{t('property.developer')}</span>
            <span className='text-base font-medium'>{developer}</span>
          </div>
        </div>
      )}
      {area && (
        <div className='flex items-start gap-3 p-2'>
          <div className='rounded-md bg-muted text-muted-foreground p-2'>
            <MapPin className='h-6 w-6' />
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-muted-foreground'>{t('map.locationTitle')}</span>
            <span className='text-base font-medium'>{area}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export { DetailsDeveloperComponent }
