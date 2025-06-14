import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChatMap } from './ChatMap'
import { TestListFlats } from '@app/-chat/components/flats/TestListFlats'

export const ChatTabs = () => {
  const { t } = useTranslation()
  return (
    <Tabs defaultValue='list' className='w-full mt-4'>
      <TabsList className='grid w-[70%] ml-auto grid-cols-2 mb-4'>
        <TabsTrigger value='list'>{t('chat.tabs.list')}</TabsTrigger>
        <TabsTrigger value='map'>{t('chat.tabs.map')}</TabsTrigger>
      </TabsList>

      <TabsContent value='list' className='w-full'>
        <TestListFlats />
      </TabsContent>

      <TabsContent value='map' className='w-full'>
        <div className='w-full bg-accent/50 rounded-lg'>
          <ChatMap />
        </div>
      </TabsContent>
    </Tabs>
  )
}
