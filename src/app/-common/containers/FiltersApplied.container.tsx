// types
import { FC, useState } from 'react'
// components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
type SimpleItem = { id?: string | number; name?: string }

const toSimpleArray = (input: unknown): SimpleItem[] => {
  if (!Array.isArray(input)) return []
  return input.map((x) => {
    if (typeof x === 'string' || typeof x === 'number') return { name: String(x) }
    if (x && typeof x === 'object') {
      const obj = x as { id?: string | number; name?: string }
      return { id: obj.id, name: obj.name }
    }
    return {}
  })
}

interface IProps {
  data: unknown
}

const FiltersAppliedContainer: FC<IProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false)
  const _data = (data ?? {}) as Record<string, unknown>
  const bedrooms = toSimpleArray(_data?.unit_bedrooms_extracted)
  const saleStatuses = toSimpleArray(_data?.sale_statuses)
  const developers = toSimpleArray(_data?.developers)
  const propertyAreas = toSimpleArray(_data?.property_areas)
  const posthandover = _data?.posthandover as boolean | undefined

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
                <span className='font-medium'>
                  {(_data?.max_price_aed as string | number | undefined) ?? '—'}
                </span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Мин. цена (AED)</span>
                <span className='font-medium'>
                  {(_data?.min_price_aed as string | number | undefined) ?? '—'}
                </span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Количество спален</span>
                <span className='font-medium'>{bedrooms?.length ?? 0}</span>
              </div>
              {bedrooms?.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {bedrooms.map((item, idx) => (
                    <span
                      key={item?.id ?? item?.name ?? idx}
                      className='rounded-md bg-muted px-2 py-1 text-xs'
                    >
                      {item?.name ?? String(item?.id ?? idx)}
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
                  {saleStatuses.map((s, idx: number) => (
                    <span
                      key={s?.id ?? s?.name ?? idx}
                      className='rounded-md bg-muted px-2 py-1 text-xs'
                    >
                      {s?.name ?? String(s?.id ?? idx)}
                    </span>
                  ))}
                </div>
              )}
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Застройщики</span>
                <span className='font-medium'>
                  {Array.isArray(developers) ? developers.length : 0}
                </span>
              </div>
              {Array.isArray(developers) && developers.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {developers.map((d, idx: number) => (
                    <span
                      key={d?.id ?? d?.name ?? idx}
                      className='rounded-md bg-muted px-2 py-1 text-xs'
                    >
                      {d?.name ?? String(d?.id ?? idx)}
                    </span>
                  ))}
                </div>
              )}
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Пост-хандовер</span>
                <span className='font-medium'>
                  {typeof posthandover === 'boolean' ? (posthandover ? 'Да' : 'Нет') : '—'}
                </span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Районы</span>
                <span className='font-medium'>
                  {Array.isArray(propertyAreas) ? propertyAreas.length : 0}
                </span>
              </div>
              {Array.isArray(propertyAreas) && propertyAreas.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {propertyAreas.map((a, idx: number) => (
                    <span
                      key={a?.id ?? a?.name ?? idx}
                      className='rounded-md bg-muted px-2 py-1 text-xs'
                    >
                      {a?.name ?? String(a?.id ?? idx)}
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
