import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'

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
  // Список возможных фраз
  const recommendations = [
    'Рекомендуется AI',
    'Новинка!',
    'Идеальное место',
    'Популярный выбор',
    'Лучший выбор',
  ]

  // Состояние для случайной фразы
  const [randomRecommendation, setRandomRecommendation] = useState('')

  useEffect(() => {
    // Функция для выбора случайной фразы
    const randomIndex = Math.floor(Math.random() * recommendations.length)
    setRandomRecommendation(recommendations[randomIndex])
  }, [])

  return (
    <div className='text-xs font-medium text-gray-500 mb-2'>
      <span className='italic'>{randomRecommendation}</span>
    </div>
  )
}

export const PropertyCard = ({ item }: Props) => {
  const image = JSON.parse(item.cover_image_url || '{}')?.url

  return (
    <Card className='p-2 flex flex-col h-full rounded-2xl overflow-hidden'>
      <CardContent className='p-2 flex flex-col justify-between h-full text-black'>
        <div className='flex gap-4'>
          {/* Изображение слева */}
          {image && (
            <div className='w-1/3'>
              <img src={image} alt={item.name} className='w-full h-20 object-cover rounded-l-xl' />
            </div>
          )}

          {/* Контент справа */}
          <div className='flex flex-col justify-between w-2/3'>
            {/* Рекомендация AI */}
            <RandomAIRecommendation />
            {/* Название и район */}
            <div className='text-sm font-semibold uppercase tracking-wide truncate'>
              {item.name}
            </div>

            {/* Статус */}
            <div className='text-sm text-gray-600 mb-4'>{item.sale_status}</div>
          </div>
        </div>

        {/* Кнопки */}
        <div className='flex items-center  w-full gap-2 mt-2'>
          <Button className='w-1/2 text-xs font-medium rounded-l-full py-1'>Узнать от AI</Button>
          <a
            href='https://t.me/ilnarshan'
            target='_blank'
            rel='noopener noreferrer'
            className='w-1/2 text-center text-xs font-medium bg-[#ffffff] text-[#1A1F36] rounded-r-full py-3 flex items-center justify-center'
          >
            Написать агенту
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
