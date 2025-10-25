import { FC } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
// infra
import { ResponseTypeEnum, TAssistantResponse } from '../schemas/assistantResponce.schema'
import ReactMarkdown from 'react-markdown'

// pages
import { DeveloperComplexesPage } from '@app/-developerComplexes/pages/DeveloperComplexes.page'

interface IProps {
  content: TAssistantResponse
}

const AssistantMessageContainer: FC<IProps> = ({ content }) => {
  const { message, data } = content

  if (content.responseType === ResponseTypeEnum.enum.smallTalk) {
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

  return <DeveloperComplexesPage data={data} message={message} />
}

export { AssistantMessageContainer }
