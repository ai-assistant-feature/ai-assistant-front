import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GPTMessageTab } from '@app/-chat/containers/GPTMessageTab'
import { FC } from 'react'
// infra
import { IGPTResponse } from '@app/-chat/infra/gptResponce.infra'
import { IItem } from '@app/-chat/infra/item.infra'

interface IProps {
  content: string | IGPTResponse
}

export const GPTMessage: FC<IProps> = ({ content }) => {
  // If content is a string, render it as simple text
  if (typeof content === 'string') {
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
        <div className='px-4'>{content}</div>
      </motion.div>
    )
  }

  // If content is GPTResponse, render the structured data
  console.log('GPT response:', content)

  // Преобразуем данные от GPT в формат, который ожидает TestListFlats
  const transformedFlats =
    content.results?.map((property: IItem, index: number) => ({
      id: property.id || index + 1,
      title: property.name,
      location: property.area,
      image: property.image,
    })) || []

  // Преобразуем данные для карты
  const locations =
    content.results?.map((property: IItem) => ({
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
