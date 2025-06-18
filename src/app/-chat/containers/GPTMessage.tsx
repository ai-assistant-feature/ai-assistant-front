import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GPTMessageTab } from '@app/-chat/containers/GPTMessageTab'
import { FC } from 'react'

interface IProps {
  content: string
}

function safeParse(content: string): any {
  try {
    let parsed = JSON.parse(content)

    // Если после первого парса получилось снова строка — парсим ещё раз
    if (typeof parsed === 'string') {
      parsed = JSON.parse(parsed)
    }

    return parsed
  } catch {
    return null
  }
}

export const GPTMessage: FC<IProps> = ({ content }) => {
  let title: string | undefined
  let results: any[] | undefined
  let isJson = false
  let fallbackText = ''

  // Всегда парсим строку
  const parsed = safeParse(content)
  if (parsed && parsed.results && Array.isArray(parsed.results)) {
    title = parsed.title
    results = parsed.results
    isJson = true
  } else {
    fallbackText = content
  }

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
      {isJson ? (
        <div className='mb-4'>
          {title && <div className='text-lg font-bold mb-2'>{title}</div>}
          <GPTMessageTab results={results} />
        </div>
      ) : (
        <div className='mb-4'>{fallbackText}</div>
      )}
    </motion.div>
  )
}
