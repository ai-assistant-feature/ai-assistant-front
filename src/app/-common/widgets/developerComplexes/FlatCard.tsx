import { DateTime } from 'luxon'

interface FlatCardProps {
  flat: any
  onSelect: (flat: any) => void
}

const FlatCard = ({ flat, onSelect }: FlatCardProps) => {
  //FIXME: вынести ru-RU или en-AE в конфиг
  const formatted = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'AED',
  }).format(flat.minPrice)

  const completionDate = DateTime.fromISO(flat.completionDatetime, { zone: 'local' })

  // Формат: "декабрь 2027" (только месяц и год)
  const formattedCompletionDate = completionDate.toLocaleString({ month: 'long', year: 'numeric' })

  return (
    <div
      onClick={() => onSelect(flat)}
      className='bg-background overflow-hidden cursor-pointer rounded-lg border border-border'
    >
      <div className='relative h-40'>
        <img
          src={flat.coverImageUrl?.url}
          alt={flat.title}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='p-3 bg-accent'>
        <h3 className='text-lg font-semibold text-primary truncate'>{flat.name}</h3>
        <div>{flat.area}</div>
        <div className='text-sm text-muted-foreground'>Срок сдачи: {formattedCompletionDate}</div>
        <div className='text-sm text-muted-foreground'>{formatted}</div>
      </div>
    </div>
  )
}

export { FlatCard }
