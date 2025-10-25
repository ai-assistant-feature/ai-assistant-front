import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
// ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// components
import { ChatMap } from '@app/-chat/components/ChatMap'
// schemas
import { TDeveloperComplexes } from '@app/-developerComplexes/schemas/developerComplexes.schema'
// containers
import { DeveloperComplexesContainer } from '@app/-developerComplexes/containers/DeveloperComplexes.container'
import { FC } from 'react'

interface IProps {
  data: any
  message: string | null
}

const DeveloperComplexesPage: FC<IProps> = ({ data, message }) => {
  const { t } = useTranslation()

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
      <Tabs defaultValue='list' className='w-full mt-4'>
        <TabsList className='grid w-[70%] ml-auto grid-cols-2 mb-4'>
          <TabsTrigger value='list'>{t('chat.tabs.list')}</TabsTrigger>
          <TabsTrigger value='map'>{t('chat.tabs.map')}</TabsTrigger>
        </TabsList>

        <TabsContent value='list' className='w-full'>
          <DeveloperComplexesContainer data={data} message={message} />
        </TabsContent>

        <TabsContent value='map' className='w-full'>
          <div className='w-full bg-accent/50 rounded-lg'>
            <ChatMap locations={locations} />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export { DeveloperComplexesPage }
