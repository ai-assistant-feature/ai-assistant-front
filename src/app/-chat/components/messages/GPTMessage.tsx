import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { ChatTabs } from '@app/-chat/components/ChatTabs'

interface GPTMessageProps {
  content: string
}

export const GPTMessage = ({ content }: GPTMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'py-2 text-sm whitespace-pre-wrap break-words rounded-lg',
        'bg-white self-start text-left w-full',
      )}
    >
      <div>
        Вот несколько вариантов квартир в Дубае. Посмотри, пожалуйста — возможно, что-то стоит
        уточнить или дополнить. Также дай знать, если есть дополнительные критерии, которые важно
        учесть при подборе.
      </div>
      <div className='mb-4'>
        <ChatTabs />
      </div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  )
}
