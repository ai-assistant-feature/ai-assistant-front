import { TDeveloperComplex } from '@app/-common/schemas/developerComplex.schema'

interface CoverProps {
  developerObjectData: TDeveloperComplex
}

const Cover = ({ developerObjectData }: CoverProps) => {
  const coverUrl = developerObjectData.cover?.url || developerObjectData.cover_image_url?.url
  if (!coverUrl) return null

  return (
    <div className='mb-4'>
      <div className='relative w-full h-48 sm:h-64 md:h-72 overflow-hidden rounded-md border border-border'>
        <img
          src={coverUrl}
          alt={developerObjectData.name || 'Cover'}
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  )
}

export { Cover }
