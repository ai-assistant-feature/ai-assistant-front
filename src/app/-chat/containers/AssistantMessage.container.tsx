//FIXME:  полностью исправить функционал
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GPTMessageTab } from '@app/-chat/containers/GPTMessageTab'
import { FC } from 'react'
// infra
import { ResponseTypeEnum, TAssistantResponse } from '../schemas/assistantResponce.schema'
import { TDeveloperComplexes } from '@app/-common/schemas/developerComplexes.schema'
import ReactMarkdown from 'react-markdown'

interface IProps {
  content: TAssistantResponse
}

const AssistantMessageContainer: FC<IProps> = ({ content }) => {
  const { message, data } = content

  if (
    content.responseType === ResponseTypeEnum.enum.needMoreInfo ||
    content.responseType === ResponseTypeEnum.enum.smallTalk
  ) {
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
        <ReactMarkdown>{message}</ReactMarkdown>
      </motion.div>
    )
  }

  // Преобразуем данные для карты
  const locations =
    data?.items?.map((property: TDeveloperComplexes) => ({
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
        <GPTMessageTab flats={data?.items || []} locations={locations} />
      </div>
    </motion.div>
  )
}

export { AssistantMessageContainer }
