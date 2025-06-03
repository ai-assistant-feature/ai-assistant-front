import { MessageSquareMore } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import { TMessage } from '@app/-chat/infra/chat.infra'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChatMap } from './ChatMap'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface IProps {
  messages: TMessage[]
  isPending: boolean
}

interface Flat {
  id: number
  title: string
  price: number
  location: string
  rooms: number
  area: number
  image: string
}

const testFlats: Flat[] = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    price: 85000,
    location: '72 6B Street - Al Quoz - Al Quoz Industrial Area 3 - Dubai - ОАЭ',
    rooms: 2,
    area: 65,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
  },
  {
    id: 2,
    title: 'Уютная студия с ремонтом',
    price: 45000,
    location: 'King Salman Bin Abdulaziz Al Saud St - Al Sufouh 1 - Dubai - ОАЭ',
    rooms: 1,
    area: 35,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500',
  },
  {
    id: 3,
    title: 'Просторная трехкомнатная',
    price: 120000,
    location: 'Jumeirah Al Qasr - Al Sufouh 1 - Dubai - ОАЭ',
    rooms: 3,
    area: 85,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
  },
]

const TestListFlats = () => {
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null)

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {testFlats.map((flat) => (
          <div
            key={flat.id}
            onClick={() => setSelectedFlat(flat)}
            className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'
          >
            <div className='relative h-40'>
              <img src={flat.image} alt={flat.title} className='w-full h-full object-cover' />
            </div>
            <div className='p-3'>
              <h3 className='text-base font-semibold mb-1 line-clamp-1'>{flat.title}</h3>
              <div className='flex justify-between items-center'>
                <div className='text-sm text-gray-600'>
                  {flat.rooms} комн. • {flat.area} м²
                </div>
                <div className='text-base font-bold text-blue-600'>
                  {flat.price.toLocaleString()} ₽
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedFlat} onOpenChange={() => setSelectedFlat(null)}>
        <DialogContent className='max-w-2xl p-0 sm:p-6 md:max-h-[90vh] sm:max-h-[85vh] max-h-[100vh] w-[95vw] sm:w-full'>
          {selectedFlat && (
            <>
              <DialogHeader className='p-4 sm:p-0'>
                <DialogTitle className='text-2xl font-bold'>{selectedFlat.title}</DialogTitle>
              </DialogHeader>

              <div className='relative h-64 sm:h-72 mb-4'>
                <img
                  src={selectedFlat.image}
                  alt={selectedFlat.title}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='space-y-4 p-4 sm:p-0'>
                <div className='flex items-center text-gray-700'>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  <span className='text-sm'>{selectedFlat.location}</span>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gray-50 p-3 rounded-lg'>
                    <div className='text-sm text-gray-600'>Комнаты</div>
                    <div className='text-lg font-semibold'>{selectedFlat.rooms}</div>
                  </div>
                  <div className='bg-gray-50 p-3 rounded-lg'>
                    <div className='text-sm text-gray-600'>Площадь</div>
                    <div className='text-lg font-semibold'>{selectedFlat.area} м²</div>
                  </div>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='text-sm text-gray-600'>Стоимость аренды</div>
                  <div className='text-2xl font-bold text-blue-600'>
                    {selectedFlat.price.toLocaleString()} ₽/мес
                  </div>
                </div>

                <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                  Связаться с агентом
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

const EmptyState = () => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col items-center justify-center text-center text-zinc-500 px-4 mt-40 mb-10'>
      <MessageSquareMore className='w-6 h-6 mb-2 text-zinc-400' />
      <h2 className='text-sm font-semibold mb-2'>{t('chat.emptyState.title')}</h2>
      <p className='text-xs text-zinc-400'>{t('chat.emptyState.description')}</p>
    </div>
  )
}

const ChatTabs = () => {
  const { t } = useTranslation()
  return (
    <Tabs defaultValue='list' className='w-full'>
      <TabsList className='grid w-full grid-cols-2 mb-4'>
        <TabsTrigger value='list'>{t('chat.tabs.list')}</TabsTrigger>
        <TabsTrigger value='map'>{t('chat.tabs.map')}</TabsTrigger>
      </TabsList>

      <TabsContent value='list' className='w-full'>
        <TestListFlats />
      </TabsContent>

      <TabsContent value='map' className='w-full'>
        <div className='w-full  bg-gray-50 rounded-lg'>
          <ChatMap />
        </div>
      </TabsContent>
    </Tabs>
  )
}

const LoadingState = () => {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='py-2 text-sm text-gray-500'
    >
      {t('common.loading')}
    </motion.div>
  )
}

const UserMessage = ({ content }: { content: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'py-2 text-sm whitespace-pre-wrap break-words rounded-lg',
        'px-4 bg-gray-100 self-end text-right max-w-[75%]',
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  )
}

const GPTMessage = ({ content }: { content: string }) => {
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
      <ChatTabs />
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  )
}

const MessageItem = ({ msg }: { msg: TMessage }) => {
  return msg.role === 'user' ? (
    <UserMessage content={msg.content} />
  ) : (
    <GPTMessage content={msg.content} />
  )
}

const MessageList = ({ messages }: { messages: TMessage[] }) => {
  return (
    <div className='flex flex-col gap-3 w-full pb-4 mt-20'>
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => (
          <MessageItem key={idx} msg={msg} />
        ))}
      </AnimatePresence>
    </div>
  )
}

const ChatMessages: FC<IProps> = ({ messages, isPending }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isPending])

  return (
    <div className='w-full flex flex-col'>
      {messages.length > 0 ? (
        <MessageList messages={messages} />
      ) : (
        <div className='flex flex-col gap-3 w-full pb-4'>
          {!isPending && <EmptyState />}
          {isPending && <LoadingState />}
        </div>
      )}

      <div ref={scrollRef} />
    </div>
  )
}

export { ChatMessages }
