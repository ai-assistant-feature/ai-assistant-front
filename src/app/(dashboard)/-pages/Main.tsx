import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Page } from '@/components/client/Page'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PropertyCard } from '@app/(dashboard)/-components/PropertyCard'
import { usePropertiesQuery } from '../-api/getProperties.query'
import { Chat } from '../-components/Chat'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const Main = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 1000)

  const { data, isLoading, isFetching, isFetched } = usePropertiesQuery(debouncedSearch)

  const showSkeleton = isLoading || isFetching
  const hasNoResults = isFetched && data?.items?.length === 0

  return (
    <Page>
      <Page.Content>
        {showSkeleton ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='space-y-4'>
                <Skeleton className='h-48 w-full rounded-xl' />
                <div className='space-y-2 px-2'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-4 w-1/2' />
                </div>
              </div>
            ))}
          </div>
        ) : hasNoResults ? (
          <div className='text-center text-muted-foreground text-sm mt-10'>
            Ничего не найдено по запросу «{debouncedSearch}»
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
