import { FC, useState } from 'react'
// components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
// types
interface IProps {
  data: any
}

const FilterDebugContainer: FC<IProps> = ({ data }) => {
  const [showFilterDebug, setShowFilterDebug] = useState<boolean>(false)

  console.log('data', data)
  return (
    <div className='mt-4'>
      <Button variant='outline' size='sm' onClick={() => setShowFilterDebug((prev) => !prev)}>
        {showFilterDebug ? 'Скрыть filter debug' : 'Показать filter debug'}
      </Button>
      {showFilterDebug && (
        <Card className='mt-4 max-w-2xl'>
          <CardHeader>
            <CardTitle>Параметры фильтра</CardTitle>
            <CardDescription>Техническая информация для отладки</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Валюта</span>
                <span className='font-medium'>{data?.base_currency ?? '—'}</span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Макс. цена (ориг.)</span>
                <span className='font-medium'>{data?.base_max_price ?? '—'}</span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Макс. цена (AED)</span>
                <span className='font-medium'>{data?.max_price_aed ?? '—'}</span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Макс. цена (ориг.)</span>
                <span className='font-medium'>{data?.max_price_original ?? '—'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { FilterDebugContainer }
