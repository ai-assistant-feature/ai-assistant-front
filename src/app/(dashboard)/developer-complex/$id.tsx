import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@app/-common/layouts/MainLayout'
import { DetailsContainer } from '@app/-developerComplexes/containers/Details.container'
import { useGetPropertyQuery } from '@app/-developerComplexes/api/getProperty.query'
import { Link } from '@tanstack/react-router'

function DeveloperComplexDetailsPage() {
  const { id } = Route.useParams()
  const {
    data: developerObjectData,
    isFetching,
    isLoading,
  } = useGetPropertyQuery({ propertyId: id })

  const isLoadingDeveloperObject = isFetching || isLoading

  return (
    <MainLayout>
      <div className='container mx-auto py-4'>
        <div className='mt-24 mb-10'>
          <Link to='/' className='text-sm text-primary underline'>
            ← Назад
          </Link>
        </div>
        <DetailsContainer
          developerObjectData={developerObjectData}
          isLoadingDeveloperObject={isLoadingDeveloperObject}
        />
      </div>
    </MainLayout>
  )
}

export const Route = createFileRoute('/(dashboard)/developer-complex/$id')({
  component: DeveloperComplexDetailsPage,
})
