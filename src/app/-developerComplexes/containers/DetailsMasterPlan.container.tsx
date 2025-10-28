import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GoogleMap } from '@app/-common/containers/GoogleMap'
import DetailsMasterPlanComponent from '../components/DetailsMasterPlan.component'
import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import DetailsPointsOfInterestComponent from '../components/DetailsPointsOfInterest.component'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const DetailsMasterPlanContainer = ({ developerObjectData }: IProps) => {
  const coordinates = developerObjectData?.coordinates || undefined

  const hasMasterPlan = Array.isArray(developerObjectData?.master_plan)
    ? developerObjectData.master_plan.length > 0
    : false

  if (!coordinates && !hasMasterPlan) return null

  return (
    <div className='my-4'>
      <h3 className='text-2xl font-semibold mb-3 mt-12'>Location</h3>
      <Tabs defaultValue={coordinates ? 'map' : 'master'} className='w-full'>
        <TabsList className='grid w-[70%] ml-auto grid-cols-2 mb-4'>
          <TabsTrigger value='map' disabled={!coordinates}>
            Map
          </TabsTrigger>
          <TabsTrigger value='master' disabled={!hasMasterPlan}>
            General Plan
          </TabsTrigger>
        </TabsList>

        <TabsContent value='map' className='w-full'>
          {coordinates && (
            <div className='w-full rounded-lg'>
              <GoogleMap coordinates={coordinates} />
            </div>
          )}
        </TabsContent>

        <TabsContent value='master' className='w-full'>
          {hasMasterPlan && (
            <DetailsMasterPlanComponent developerObjectData={developerObjectData} />
          )}
        </TabsContent>
      </Tabs>

      <DetailsPointsOfInterestComponent developerObjectData={developerObjectData} />
    </div>
  )
}

export default DetailsMasterPlanContainer
