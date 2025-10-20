import { Skeleton } from '@/components/ui/skeleton'

const ApartmentDetailsSkeleton = () => {
  return (
    <>
      <div className='mb-4'>
        <Skeleton className='w-full h-48 sm:h-64 md:h-72 rounded-md' />
      </div>

      <div className='mb-4'>
        <Skeleton className='h-6 w-40 mb-3' />
        <div className='flex items-center gap-3 mb-2'>
          <Skeleton className='h-10 w-10 rounded' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-3 w-28' />
          </div>
        </div>
        <Skeleton className='h-3 w-64 mb-2' />
        <Skeleton className='h-3 w-full mb-1' />
        <Skeleton className='h-3 w-5/6' />
      </div>

      <div className='mb-4'>
        <Skeleton className='h-6 w-36 mb-3' />
        <div className='flex gap-3 overflow-x-auto pb-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='rounded-md border border-border overflow-hidden bg-accent flex-shrink-0 min-w-[260px] max-w-[280px]'
            >
              <Skeleton className='w-full h-36 sm:h-40 md:h-44' />
              <div className='p-3 flex flex-col gap-2'>
                <Skeleton className='h-4 w-44' />
                <Skeleton className='h-3 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <Skeleton className='h-6 w-40 mb-3' />
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='w-full h-28 sm:h-36 md:h-40 rounded-md' />
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <Skeleton className='h-6 w-40 mb-3' />
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='w-full h-28 sm:h-36 md:h-40 rounded-md' />
          ))}
        </div>
      </div>

      <Skeleton className='w-full h-10 rounded-lg' />
    </>
  )
}

export { ApartmentDetailsSkeleton }
