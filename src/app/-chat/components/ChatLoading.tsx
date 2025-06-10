import { motion } from 'framer-motion'

const dotTransition = {
  repeat: Infinity,
  ease: 'easeInOut',
  duration: 0.6,
}

const ChatLoading = () => {
  return (
    <div className='flex items-center gap-1 py-2 text-muted-foreground pb-24'>
      <motion.span
        className='block h-2 w-2 rounded-full bg-muted-foreground'
        animate={{ y: [0, -4, 0] }}
        transition={{ ...dotTransition, delay: 0 }}
      />
      <motion.span
        className='block h-2 w-2 rounded-full bg-muted-foreground'
        animate={{ y: [0, -4, 0] }}
        transition={{ ...dotTransition, delay: 0.2 }}
      />
      <motion.span
        className='block h-2 w-2 rounded-full bg-muted-foreground'
        animate={{ y: [0, -4, 0] }}
        transition={{ ...dotTransition, delay: 0.4 }}
      />
    </div>
  )
}

export { ChatLoading }
