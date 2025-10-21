import { motion } from 'framer-motion'
// styled
import { DOT_TRANSITION } from '@app/-common/styled/DotTransition'

const ChatLoading = () => {
  return (
    <div className='flex items-center gap-1 py-2 text-muted-foreground pb-24'>
      <motion.span
        className='block h-2 w-2 rounded-full bg-muted-foreground'
        animate={{ y: [0, -4, 0] }}
        transition={{ ...DOT_TRANSITION, delay: 0 }}
      />
      <motion.span
        className='block h-2 w-2 rounded-full bg-muted-foreground'
        animate={{ y: [0, -4, 0] }}
        transition={{ ...DOT_TRANSITION, delay: 0.2 }}
      />
      <motion.span
        className='block h-2 w-2 rounded-full bg-muted-foreground'
        animate={{ y: [0, -4, 0] }}
        transition={{ ...DOT_TRANSITION, delay: 0.4 }}
      />
    </div>
  )
}

export { ChatLoading }
