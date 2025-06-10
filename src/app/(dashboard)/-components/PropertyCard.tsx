import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Property = {
  id: number
  name: string
  area: string
  area_unit: string
  min_price: number
  price_currency: string
  cover_image_url: string
  developer: string
  sale_status: string
  completion_datetime: string
}

type Props = {
  item: Property
}

const RandomAIRecommendation = () => {
  const { t } = useTranslation()

  // Список возможных ключей переводов
  const recommendationKeys = [
    'property.recommendations.aiRecommended',
    'property.recommendations.new',
    'property.recommendations.perfectPlace',
    'property.recommendations.popularChoice',
    'property.recommendations.bestChoice',
  ]

  // Состояние для случайной фразы
  const [randomRecommendation, setRandomRecommendation] = useState('')

  useEffect(() => {
    // Функция для выбора случайного ключа
    const randomIndex = Math.floor(Math.random() * recommendationKeys.length)
    setRandomRecommendation(t(recommendationKeys[randomIndex]))
  }, [t])

  return (
    <div className='text-xs font-medium text-muted-foreground mb-2'>
      <span>{randomRecommendation}</span>
    </div>
  )
}

export const PropertyCard = ({ item }: Props) => {
  const image = JSON.parse(item.cover_image_url || '{}')?.url

  return (
    <Card className='p-2 flex flex-col h-full overflow-hidden'>
      <CardContent className='p-2 flex flex-col justify-between h-full'>
        <div className='flex gap-4'>
          {/* Изображение слева */}
          {image && (
            <div className='w-1/3'>
              <img src={image} alt={item.name} className='w-full h-16 object-cover rounded-l-xl' />
            </div>
          )}

          {/* Контент справа */}
          <div className='flex flex-col justify-between w-2/3'>
            {/* Рекомендация AI */}
            <RandomAIRecommendation />
            {/* Название и район */}
            <div className='text-sm uppercase tracking-wide truncate text-foreground'>
              {item.name}
            </div>

            {/* Статус */}
            <div className='text-xs text-muted-foreground'>{item.sale_status}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
