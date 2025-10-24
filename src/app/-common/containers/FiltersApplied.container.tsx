// types
import { FC, useState } from 'react'
// components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
interface IProps {
  data: any
}

const FiltersAppliedContainer: FC<IProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false)
  console.log('data', data)
  const bedrooms = data?.unit_bedrooms_extracted ?? []
  const saleStatuses = data?.sale_statuses ?? []

  return (
    <div className='mt-4'>
      <Button variant='outline' size='sm' onClick={() => setOpen((v) => !v)}>
        {open ? 'Скрыть фильтры' : 'Показать фильтры'}
      </Button>
      {open && (
        <Card className='mt-4 max-w-2xl'>
          <CardHeader>
            <CardTitle>Применённые фильтры</CardTitle>
            <CardDescription>Результаты текущих параметров</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Макс. цена (AED)</span>
                <span className='font-medium'>{data?.max_price_aed ?? '—'}</span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Количество спален</span>
                <span className='font-medium'>{bedrooms?.length ?? 0}</span>
              </div>
              {bedrooms?.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {bedrooms.map((item: any) => (
                    <span
                      key={item?.id ?? item?.name ?? String(item)}
                      className='rounded-md bg-muted px-2 py-1 text-xs'
                    >
                      {item?.name ?? String(item)}
                    </span>
                  ))}
                </div>
              )}
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Статус продажи</span>
                <span className='font-medium'>{saleStatuses?.length ?? 0}</span>
              </div>
              {Array.isArray(saleStatuses) && saleStatuses.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {saleStatuses.map((s: any, idx: number) => (
                    <span
                      key={s?.id ?? s?.name ?? idx}
                      className='rounded-md bg-muted px-2 py-1 text-xs'
                    >
                      {s?.name ?? String(s)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { FiltersAppliedContainer }
