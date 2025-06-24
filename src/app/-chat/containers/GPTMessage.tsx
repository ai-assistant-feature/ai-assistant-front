import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GPTMessageTab } from '@app/-chat/containers/GPTMessageTab'
import { FC } from 'react'

interface PropertyResult {
  id: number
  name: string
  developer: string
  area: string
  coordinates: string
  image: string
  status: string
  sale_status: string
  price_currency: string
  post_handover: boolean
  // Добавляем поля, которые нужны для TestListFlats
  price?: number
  rooms?: number
  property_area?: number
}

interface GPTResponse {
  title: string
  results: PropertyResult[]
}

interface IProps {
  content: GPTResponse
}

export const GPTMessage: FC<IProps> = ({ content }) => {
  console.log('GPT response:', content)

  // Преобразуем данные от GPT в формат, который ожидает TestListFlats
  const transformedFlats =
    content.results?.map((property, index) => ({
      id: property.id || index + 1,
      title: property.name,
      price: property.price || Math.floor(Math.random() * 5000000) + 1000000, // Временная цена, если не приходит
      location: property.area,
      rooms: property.rooms || Math.floor(Math.random() * 3) + 1, // Временное количество комнат
      area: property.property_area || Math.floor(Math.random() * 100) + 50, // Временная площадь
      image: property.image,
    })) || []

  // Преобразуем данные для карты
  const locations =
    content.results?.map((property) => ({
      name: property.name,
      coordinates: property.coordinates,
    })) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'py-2 text-sm whitespace-pre-wrap break-words rounded-lg',
        'bg-background text-foreground self-start text-left w-full',
      )}
    >
      {/* Заголовок ответа */}
      <div className='mb-4'>
        <h3 className='font-medium'>{content.title}</h3>
      </div>

      {/* Табы для дополнительных действий */}
      <div className='mt-6'>
        <GPTMessageTab flats={transformedFlats} locations={locations} />
      </div>
    </motion.div>
  )
}
