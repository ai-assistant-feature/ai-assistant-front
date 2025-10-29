import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import { useTranslation } from 'react-i18next'
// containers
import { DeveloperChartContainer } from '@app/-developerComplexes/containers/DeveloperChart.container'
// components
import { DetailsCoverComponent } from '@app/-developerComplexes/components/DetailsCover.component'
import { DetailsDeveloperComponent } from '@app/-developerComplexes/components/DetailsDeveloper.component'
import { DetailsArchitectureComponent } from '@app/-developerComplexes/components/DetailsArchitecture.component'
import { DetailsInteriorComponent } from '@app/-developerComplexes/components/DetailsInterior.component'
import { DetailsUnitBlocksComponent } from '@app/-developerComplexes/components/DetailsUnitBlocks.component'
import { DetailsSkeletonComponent } from '@app/-developerComplexes/components/DetailsSkeleton.component'
import { DetailsOverviewComponent } from '@app/-developerComplexes/components/DetailsOverview.component'
import { PaymentsPlanComponent } from '../components/PaymentsPlan.Component'
import DetailsMasterPlanContainer from './DetailsMasterPlan.container'
import { Link } from '@tanstack/react-router'

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
      {developerObjectData?.id && (
        <div className='px-2 pb-2'>
          <Link
            to={'/developer-complex/$id'}
            params={{ id: String(developerObjectData.id) }}
            className='text-sm text-primary underline'
          >
            Открыть страницу
          </Link>
        </div>
      )}
      <DetailsUnitBlocksComponent developerObjectData={developerObjectData} />
      <DeveloperChartContainer propertyId={String(developerObjectData.id)} />
      <PaymentsPlanComponent developerObjectData={developerObjectData} />
      <DetailsMasterPlanContainer developerObjectData={developerObjectData} />

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
