import { useEffect, useState } from 'react'
import { Page } from '@/components/client/Page'
// import { Skeleton } from '@/components/ui/skeleton'
// import { PropertyCard } from '@app/(dashboard)/-components/PropertyCard'
import { usePropertiesQuery } from '../-api/getProperties.query'
import { Chat } from '../-components/Chat'
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import logo from '@/assets/logo.jpeg'

const Main = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false)
    }, 1000) // 1 секунда

    return () => clearTimeout(timeout)
  }, [])

  const { data, isLoading, isFetching, isFetched } = usePropertiesQuery()

  const showSkeleton = isLoading || isFetching
  const hasNoResults = isFetched && data?.items?.length === 0

  if (showSplash) {
    return (
      <div className='min-h-screen flex items-center justify-center  bg-[#0342a2]'>
        <img src={logo} alt='Logo' className='w-40 h-40 object-contain rounded-[8px]' />
      </div>
    )
  }

  return (
    <Page>
      <Page.Content>
        {/* <Header /> */}

        {/* <div className='text-sm text-center mb-4 mt-4'>Спросите меня о жилье — я помогу</div> */}

        {/* {showSkeleton ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            <Skeleton className='h-48 w-full rounded-xl' />
          </div>
        ) : hasNoResults ? (
          <div className='text-center text-muted-foreground text-sm mt-10'>
            Ничего не найдено по запросу
          </div>
        ) : (
          <Carousel className='w-full bg-[#ffffff] sticky top-0 z-10 overflow-x-auto'>
            <CarouselContent className='flex snap-x snap-mandatory gap-1 mt-2 mb-4'>
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
        )} */}

        <Chat />
      </Page.Content>
    </Page>
  )
}

export { Main }
