import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import { useTranslation } from 'react-i18next'
// components
import { DetailsCoverComponent } from '@app/-developerComplexes/components/DetailsCover.component'
import { DetailsDeveloperComponent } from '@app/-developerComplexes/components/DetailsDeveloper.component'
import { DetailsArchitectureComponent } from '@app/-developerComplexes/components/DetailsArchitecture.component'
import { DetailsInteriorComponent } from '@app/-developerComplexes/components/DetailsInterior.component'
import { DetailsUnitBlocksComponent } from '@app/-developerComplexes/components/DetailsUnitBlocks.component'
import { DetailsSkeletonComponent } from '@app/-developerComplexes/components/DetailsSkeleton.component'
import { DetailsOverviewComponent } from '@app/-developerComplexes/components/DetailsOverview.component'

interface IProps {
  developerObjectData: TDeveloperComplex | null | undefined
  isLoadingDeveloperObject: boolean
}

const DetailsContainer = ({ developerObjectData, isLoadingDeveloperObject }: IProps) => {
  const { t } = useTranslation()

  if (isLoadingDeveloperObject) return <DetailsSkeletonComponent />

  if (!developerObjectData) return null
  return (
    <>
      <DetailsCoverComponent developerObjectData={developerObjectData} />
      <DetailsDeveloperComponent developerObjectData={developerObjectData} />
      <DetailsUnitBlocksComponent developerObjectData={developerObjectData} />
      <DetailsArchitectureComponent developerObjectData={developerObjectData} />
      <DetailsInteriorComponent developerObjectData={developerObjectData} />
      <DetailsOverviewComponent developerObjectData={developerObjectData} />

      <button className='w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors'>
        {t('cta.contactAgent')}
      </button>
    </>
  )
}

export { DetailsContainer }
