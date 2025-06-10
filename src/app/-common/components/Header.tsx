import { useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Sparkles } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { usePropertiesQuery } from '@app/(dashboard)/-api/getProperties.query'
import { PropertyCard } from '@app/(dashboard)/-components/PropertyCard'
import { Skeleton } from '@/components/ui/skeleton'

const Header = () => {
  const { data, isLoading, isFetching } = usePropertiesQuery()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50 w-full h-16 px-4 flex items-center border-b bg-background border-border'>
        <div className='z-10'>
          <SidebarTrigger />
        </div>

        <div className='absolute inset-0 flex justify-center items-center pointer-events-none'>
          <h1 className='text-lg font-semibold text-foreground'>Rooma</h1>
        </div>

        <div className='ml-auto z-10'>
          <button
            onClick={toggleDropdown}
            className='p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition'
          >
            <Sparkles className='w-5 h-5' />
          </button>
        </div>
      </header>

      {showDropdown && (
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
                : data?.items?.map((item: any) => (
                    <CarouselItem
                      key={item.id}
                      className='w-[85%] md:w-[60%] lg:w-[40%] shrink-0 snap-start !basis-auto'
                    >
                      <PropertyCard item={item} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </>
  )
}

export { Header }
