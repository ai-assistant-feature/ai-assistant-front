import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessageCircle } from 'lucide-react'

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

export const PropertyCard = ({ item }: Props) => {
  const image = JSON.parse(item.cover_image_url || '{}')?.url

  return (
    <Card className='flex flex-col h-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white'>
      <CardContent className='p-4 flex flex-col justify-between h-full'>
        {/* Название и район */}
        <div>
          <div className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>
            {item.name}
          </div>
          <div className='text-xs text-muted-foreground mb-3'>{item.area}</div>
        </div>

        {/* Изображение */}
        {image && (
          <div className='mb-4'>
            <img src={image} alt={item.name} className='w-full h-32 object-cover rounded-xl' />
          </div>
        )}

        {/* Статус */}
        <div className='text-sm text-muted-foreground mb-6'>
          <span className='font-medium text-gray-700'>Статус:</span> {item.sale_status}
        </div>

        {/* Кнопка */}
        <div className='flex items-center justify-between gap-4 mt-auto'>
          <Button className='w-3/5 text-sm font-medium bg-black text-white hover:bg-gray-900 transition rounded-full py-3'>
            Узнать условия
          </Button>
          <a
            href='https://t.me/ilnarshan'
            target='_blank'
            rel='noopener noreferrer'
            className='w-9 h-9 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-900 transition'
          >
            <MessageCircle className='w-4 h-4' />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
