import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
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
      className='w-full flex justify-end'
    >
      <div className='text-sm whitespace-pre-wrap break-words rounded-lg py-2  self-end text-right px-4 bg-accent text-accent-foreground self-end text-right '>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  )
}
