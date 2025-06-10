import { FC } from 'react'
// ui
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
// components
import { HeaderPropertyCard } from '@app/-common/components/HeaderPropertyCard'

interface HeaderDropdownProps {
  isLoading: boolean
  isFetching: boolean
  items?: any[]
}

export const HeaderDropdown: FC<HeaderDropdownProps> = ({ isLoading, isFetching, items }) => {
  return (
    <div className='fixed top-16 left-0 right-0 z-40 bg-background border-b border-border px-1 shadow-md py-4'>
      <Carousel className='w-full max-w-3xl mx-auto'>
        <CarouselContent>
          {isLoading || isFetching
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className='w-[85%] md:w-[60%] lg:w-[40%] shrink-0 snap-start !basis-auto'
                >
                  <Skeleton className='h-20 w-full rounded-xl' />
                </CarouselItem>
              ))
            : items?.map((item: any) => (
                <CarouselItem
                  key={item.id}
                  className='w-[85%] md:w-[60%] lg:w-[40%] shrink-0 snap-start !basis-auto'
                >
                  <HeaderPropertyCard item={item} />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
