import { FC, useState } from 'react'
import ReactMarkdown from 'react-markdown'
// components
import { ComplexCardComponent } from '@app/-developerComplexes/components/ComplexCard.component'
// containers
import { ComplexesOverlayContainer } from '@app/-developerComplexes/containers/ComplexesOverlay.container'
import { useGetPropertyQuery } from '../api/getProperty.query'
// containers
import { FiltersAppliedContainer } from '@app/-common/containers/FiltersApplied.container'

interface IProps {
  data: any
  message: string | null
}

const DeveloperComplexesContainer: FC<IProps> = ({ data, message }) => {
  const [developerId, setDeveloperId] = useState<string | null>(null)
  const {
    data: developerObjectData,
    isFetching,
    isLoading,
  } = useGetPropertyQuery({ propertyId: developerId })
  const isLoadingDeveloperObject = isFetching || isLoading
  //тут запрос именно по этому виджету

  // Если нет квартир, показываем сообщение
  if (!data?.items || data?.items?.length === 0) {
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
            {data?.items?.map((item: any) => (
              <div key={item.id} className='pl-2 md:pl-4 basis-[85%] md:basis-[45%] shrink-0'>
                <ComplexCardComponent flat={item} setDeveloperId={setDeveloperId} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>

      {data?.filters_applied && <FiltersAppliedContainer data={data?.filters_applied}  filterDebug={data?.ai_filter_debug}/>}

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
