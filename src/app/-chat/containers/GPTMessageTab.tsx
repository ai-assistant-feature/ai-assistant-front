import { useTranslation } from 'react-i18next'
import { FC, useMemo } from 'react'
// ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// components
import { ChatMap } from '@app/-chat/components/ChatMap'
import { TestListFlats } from '@app/-chat/components/flats/TestListFlats'

interface IProps {
  results?: any[]
}

export const GPTMessageTab: FC<IProps> = ({ results }) => {
  const { t } = useTranslation()

  // Парсим координаты всех квартир
  const coordinates = useMemo(() => {
    if (!results) return undefined
    return results
      .map((item) => {
        if (typeof item.coordinates === 'string') {
          const parts = item.coordinates.split(',').map(Number)
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return [parts[0], parts[1]] as [number, number]
          }
        }
        return undefined
      })
      .filter(Boolean) as [number, number][]
  }, [results])

  return (
    <Tabs defaultValue='list' className='w-full mt-4'>
      <TabsList className='grid w-[70%] ml-auto grid-cols-2 mb-4'>
        <TabsTrigger value='list'>{t('chat.tabs.list')}</TabsTrigger>
        <TabsTrigger value='map'>{t('chat.tabs.map')}</TabsTrigger>
      </TabsList>

      <TabsContent value='list' className='w-full'>
        <TestListFlats results={results} />
      </TabsContent>

      <TabsContent value='map' className='w-full'>
        <div className='w-full bg-accent/50 rounded-lg'>
          <ChatMap coordinates={coordinates} />
        </div>
      </TabsContent>
    </Tabs>
  )
}
