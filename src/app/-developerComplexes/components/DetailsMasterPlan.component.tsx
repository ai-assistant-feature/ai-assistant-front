import { FC, useState } from 'react'
import { TDeveloperComplex } from '../schemas/developerComplex.schema'
import { Skeleton } from '@/components/ui/skeleton'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const DetailsMasterPlanComponent: FC<IProps> = ({ developerObjectData }) => {
  const urlImg = developerObjectData.master_plan?.[0]?.url
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  if (!urlImg) return null

  return (
    <div className='relative w-full h-[300px] rounded-lg overflow-hidden my-4 border border-gray-200 bg-accent'>
      {!isLoaded && !isError && <Skeleton className='absolute inset-0 w-full h-full' />}
      {isError ? (
        <div className='absolute inset-0 flex items-center justify-center bg-red-100/80 text-red-600'>
          Failed to load master plan
        </div>
      ) : (
        <img
          src={urlImg}
          alt='Master Plan'
          className='w-full h-full object-contain'
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}

export default DetailsMasterPlanComponent
