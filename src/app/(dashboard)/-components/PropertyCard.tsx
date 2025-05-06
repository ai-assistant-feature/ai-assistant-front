import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

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
  const completionYear = item.completion_datetime
    ? new Date(item.completion_datetime).getFullYear()
    : null

  return (
    <Card className='flex flex-col h-full'>
      {/* <CardHeader>
        <CardTitle className='text-base font-medium'>{item.name}</CardTitle>
        <CardDescription>{item.area}</CardDescription>
      </CardHeader> */}

      <CardContent className='p-2'>
        <div className='text-xs font-medium  uppercase'>{item.name}</div>
        <div className='text-xs text-muted-foreground mb-2'>{item.area}</div>
        {image && (
          <img src={image} alt={item.name} className='w-full h-28 object-cover rounded-lg' />
        )}

        <div className='mt-2 mb-6 text-sm text-muted-foreground w-full'>
          <p>Статус: {item.sale_status}</p>
          {/* {completionYear && <p>Год сдачи: {completionYear}</p>} */}
        </div>
        <Button className='text-xs w-full'>Узнать условия</Button>
      </CardContent>

      {/* <CardFooter>
        <span className='text-xs text-muted-foreground'>Площадь указана в {item.area_unit}</span>
      </CardFooter> */}
    </Card>
  )
}
