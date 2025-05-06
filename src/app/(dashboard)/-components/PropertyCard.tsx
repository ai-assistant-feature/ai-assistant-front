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
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.area}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {image && (
          <img src={image} alt={item.name} className='h-48 w-full rounded-lg object-cover' />
        )}
        <div className='text-sm text-muted-foreground'>
          <p>Статус: {item.sale_status}</p>
          {completionYear && <p>Год сдачи: {completionYear}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <span className='text-xs text-muted-foreground'>Площадь указана в {item.area_unit}</span>
      </CardFooter>
    </Card>
  )
}
