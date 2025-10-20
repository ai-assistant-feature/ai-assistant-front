import { TDeveloperComplex } from '@app/-common/schemas/developerComplex.schema'
import { useTranslation } from 'react-i18next'
import { Cover } from './apartmentDetails/Cover'
import { Developer } from './apartmentDetails/Developer'
import { Architecture } from './apartmentDetails/Architecture'
// import { Overview } from './apartmentDetails/Overview'
import { Interior } from './apartmentDetails/Interior'
import { UnitBlocks } from './apartmentDetails/UnitBlocks'
import { ApartmentDetailsSkeleton } from './apartmentDetails/Skeleton'

interface FlatDetailsProps {
  developerObjectData: TDeveloperComplex | null | undefined
  isLoadingDeveloperObject: boolean
}

const FlatDetails = ({ developerObjectData, isLoadingDeveloperObject }: FlatDetailsProps) => {
  const { t } = useTranslation()

  if (isLoadingDeveloperObject) return <ApartmentDetailsSkeleton />

  if (!developerObjectData) return null
  return (
    <>
      <Cover developerObjectData={developerObjectData} />
      <Developer developerObjectData={developerObjectData} />
      <UnitBlocks developerObjectData={developerObjectData} />
      <Architecture developerObjectData={developerObjectData} />
      <Interior developerObjectData={developerObjectData} />
      {/* <Overview developerObjectData={developerObjectData} /> */}

      <button className='w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors'>
        {t('cta.contactAgent')}
      </button>
    </>
  )
}

export { FlatDetails }
