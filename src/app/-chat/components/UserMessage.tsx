import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { FC } from 'react'

interface IProps {
  content: string
}

export const UserMessage: FC<IProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'py-2 text-sm whitespace-pre-wrap break-words rounded-lg',
        'px-4 bg-accent text-accent-foreground self-end text-right max-w-[75%]',
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  )
}
