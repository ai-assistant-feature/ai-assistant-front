interface FlatDetailsProps {
  flat: any
}

const FlatDetails = ({ flat }: FlatDetailsProps) => {
  if (!flat) return null

  return (
    <>
      <div className='relative h-64 sm:h-72 mb-4'>
        <img
          src={flat?.coverImageUrl?.url}
          alt={flat?.title}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='space-y-4 p-4 sm:p-0'>
        <div className='flex items-center text-muted-foreground'>
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <span className='text-sm'>{flat?.location}</span>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-accent p-3 rounded-lg'>
            <div className='text-sm text-muted-foreground'>Площадь</div>
            <div className='text-lg font-semibold text-accent-foreground'>{flat?.area} м²</div>
          </div>
        </div>

        <button className='w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors'>
          Связаться с агентом
        </button>
      </div>
    </>
  )
}

export { FlatDetails }
