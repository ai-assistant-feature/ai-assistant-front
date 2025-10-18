//FIXME:  полностью исправить функционал

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GPTMessageTab } from '@app/-chat/containers/GPTMessageTab'
import { FC } from 'react'
// infra
import { ResponseTypeEnum, TGPTApiResponse } from '../schemas/gptResponce.schema'
import { TApartment } from '@app/-common/schemas/apartments.schema'

interface IProps {
  content: TGPTApiResponse
}

export const GPTMessage: FC<IProps> = ({ content }) => {
  const { message, data } = content

  console.log('content', content)
  if (content.responceType === ResponseTypeEnum.enum.needMoreInfo) {
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
        <div className='px-4'>{message}</div>
      </motion.div>
    )
  }

  const transformedFlats =
    data?.items?.map((property: any, index: number) => {
      const img = JSON.parse(property.cover_image_url)
      return {
        id: property.id || index + 1,
        title: property.developer,
        location: property.area,
        image: img.url,
      }
    }) || []

  console.log('transformedFlats', transformedFlats)
  // Преобразуем данные для карты
  const locations =
    data?.items?.map((property: TApartment) => ({
      name: property.developer,
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
      {/* Табы для дополнительных действий */}
      <div className='mt-6'>
        <GPTMessageTab flats={transformedFlats} locations={locations} />
      </div>
    </motion.div>
  )
}
