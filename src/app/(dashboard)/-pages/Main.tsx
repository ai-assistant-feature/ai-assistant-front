import { Page } from '@/components/client/Page'
import { Skeleton } from '@/components/ui/skeleton'
import { PropertyCard } from '@app/(dashboard)/-components/PropertyCard'
import { usePropertiesQuery } from '../-api/getProperties.query'
import { Chat } from '../-components/Chat'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Header } from '../-components/Header'

const Main = () => {
  const { data, isLoading, isFetching, isFetched } = usePropertiesQuery()

  const showSkeleton = isLoading || isFetching
  const hasNoResults = isFetched && data?.items?.length === 0

  return (
    <Page>
      <Page.Content>
        <Header />

        <div className='bg-white overflow-hidden mb-6'>
          <div className='max-w-5xl mx-auto text-center z-10'>
            <h1 className='text-xl text-gray-900'>Ваш умный помощник</h1>
            <p className='text-sm md:text-xl text-gray-600'>
              Персональный подбор квартир с помощью <span>искусственного интеллекта</span>.<br />
            </p>
          </div>
        </div>

        {showSkeleton ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            <Skeleton className='h-48 w-full rounded-xl' />
          </div>
        ) : hasNoResults ? (
          <div className='text-center text-muted-foreground text-sm mt-10'>
            Ничего не найдено по запросу
          </div>
        ) : (
          <Carousel className='w-full overflow-x-auto'>
            <CarouselContent className='flex snap-x snap-mandatory gap-1'>
              {data?.items?.map((item: any) => (
                <CarouselItem
                  key={item.id}
                  className='w-[85%] md:w-[60%] lg:w-[40%] shrink-0 snap-start !basis-auto'
                >
                  <PropertyCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Chat />
      </Page.Content>
    </Page>
  )
}

export { Main }
