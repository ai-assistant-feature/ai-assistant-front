import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// components
import { ComplexCardComponent } from '@app/-developerComplexes/components/ComplexCard.component'
// containers
import { ComplexesOverlayContainer } from '@app/-developerComplexes/containers/ComplexesOverlay.container'
import { useGetPropertyQuery } from '../api/getProperty.query'

interface TestListFlatsProps {
  flats?: any[]
}

const DeveloperComplexesContainer = ({ flats = [] }: TestListFlatsProps) => {
  const [developerId, setDeveloperId] = useState<string | null>(null)
  const {
    data: developerObjectData,
    isFetching,
    isLoading,
  } = useGetPropertyQuery({ propertyId: developerId })
  const isLoadingDeveloperObject = isFetching || isLoading
  //тут запрос именно по этому виджету

  // Если нет квартир, показываем сообщение
  if (!flats || flats.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p>К сожалению, по заданным параметрам ничего не найдено.</p>
        <p className='text-sm mt-2'>Попробуйте изменить критерии поиска.</p>
      </div>
    )
  }

  return (
    <>
      <div>
        <Carousel
          opts={{
            align: 'start',
            containScroll: 'trimSnaps',
          }}
          className='w-full'
        >
          <CarouselContent className='-ml-2 md:-ml-4'>
            {flats.map((flat) => (
              <CarouselItem key={flat.id} className='pl-2 md:pl-4 basis-[85%] md:basis-[45%]'>
                <ComplexCardComponent flat={flat} setDeveloperId={setDeveloperId} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <ComplexesOverlayContainer
        developerObjectData={developerObjectData}
        isLoadingDeveloperObject={isLoadingDeveloperObject}
        developerId={developerId}
        onClose={() => setDeveloperId(null)}
      />
    </>
  )
}

export { DeveloperComplexesContainer }
