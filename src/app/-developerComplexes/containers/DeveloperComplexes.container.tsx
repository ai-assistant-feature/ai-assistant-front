import { useState } from 'react'
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
        <div
          className='w-full overflow-x-auto scrollbar-hide'
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className='flex -ml-2 md:-ml-4'>
            {flats.map((flat) => (
              <div key={flat.id} className='pl-2 md:pl-4 basis-[85%] md:basis-[45%] shrink-0'>
                <ComplexCardComponent flat={flat} setDeveloperId={setDeveloperId} />
              </div>
            ))}
          </div>
        </div>
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
