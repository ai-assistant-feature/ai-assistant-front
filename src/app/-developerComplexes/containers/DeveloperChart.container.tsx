import {
  BarChart,
  Bar,
  XAxis,
  // YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { useGetPriceGraphQuery } from '../api/getPriceGraph.query'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrency } from '@app/-common/context/CurrencyProvider'
import { useGetExchangeRatesQuery } from '@app/-common/api/getExchangeRates.query'
import { type TPriceGraphPoint } from '@app/-developerComplexes/schemas/priceGraph.schema'

const parsenameDate = (name: string) => {
  const [d, m, y] = name.split('.')
  return new Date(Number(y), Number(m) - 1, Number(d)).getTime()
}

const chartConfig = {
  byArea: { label: 'developerChart.byArea', color: '#2563eb' },
  global: { label: 'developerChart.global', color: '#94a3b8' },
} satisfies ChartConfig

type ChartData =
  | { data: Array<{ name: string; global: number }>; onlyGlobal: true }
  | {
      data: Array<{ name: string; byArea: number; global: number }>
      onlyGlobal: false
    }

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const { t } = useTranslation()
  const { format, currency } = useCurrency()
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className='bg-white/95 p-3 rounded-lg shadow-md text-sm'>
      <div className='font-medium mb-1'>{label}</div>
      {payload.map((p) => (
        <div key={p.name}>
          {p.name}: {format(Number(p.value), { currency })} {t('developerChart.perSquareMeter')}
        </div>
      ))}
    </div>
  )
}

const DeveloperChartContainer = ({ propertyId }: { propertyId: string }) => {
  const { t } = useTranslation()
  const { data: priceGraph, isLoading } = useGetPriceGraphQuery({ propertyId })

  const { currency } = useCurrency()
  const { data: exchangeRates } = useGetExchangeRatesQuery()
  const exchangeRate: number = (exchangeRates?.[currency] as number) || 1

  const [selectedByAreaRoom, setSelectedByAreaRoom] = useState<string>('')
  const [selectedGlobalRoom, setSelectedGlobalRoom] = useState<string>('')

  const byAreaRooms = useMemo(() => {
    const rooms = new Set<string>()
    priceGraph?.by_area?.forEach((p) => p.by_rooms?.forEach((r) => rooms.add(r.room)))
    return Array.from(rooms)
  }, [priceGraph])

  const globalRooms = useMemo(() => {
    const rooms = new Set<string>()
    priceGraph?.global?.forEach((p) => p.by_rooms?.forEach((r) => rooms.add(r.room)))
    return Array.from(rooms)
  }, [priceGraph])

  const sampled = useMemo(() => {
    const byArea = priceGraph?.by_area ?? []
    const global = priceGraph?.global ?? []

    if (!byArea.length && !global.length)
      return { names: [] as string[], onlyGlobal: false as const }
    if (!byArea.length && global.length) {
      const sortedGlobal = [...global].sort((a, b) => parsenameDate(a.name) - parsenameDate(b.name))
      const limitedGlobal = sortedGlobal.slice(-46)
      const step = (limitedGlobal.length - 1) / 9
      const names: string[] = []
      for (let i = 0; i < 10; i++) {
        const index = Math.round(i * step)
        const g = limitedGlobal[index]
        if (g) names.push(g.name)
      }
      return { names, onlyGlobal: true as const }
    }

    const sortedByArea = [...byArea].sort((a, b) => parsenameDate(a.name) - parsenameDate(b.name))
    const sortedGlobal = [...global].sort((a, b) => parsenameDate(a.name) - parsenameDate(b.name))
    const limitedByArea = sortedByArea.slice(-46)
    const limitedGlobal = sortedGlobal.slice(-46)
    const step = (limitedByArea.length - 1) / 9
    const names: string[] = []
    for (let i = 0; i < 10; i++) {
      const index = Math.round(i * step)
      const byAreaItem = limitedByArea[index]
      const globalItem = limitedGlobal.find((g) => g.name === byAreaItem.name)
      if (byAreaItem && globalItem) {
        names.push(byAreaItem.name)
      }
    }
    return { names, onlyGlobal: false as const }
  }, [priceGraph])

  const displayData = useMemo<ChartData>(() => {
    if (!sampled.names.length) return { data: [], onlyGlobal: sampled.onlyGlobal }

    const byArea = priceGraph?.by_area ?? []
    const global = priceGraph?.global ?? []

    const getValue = (point: TPriceGraphPoint | undefined, selectedRoom: string) => {
      if (!point) return undefined
      if (!selectedRoom) return point.avg_trans_value_per_area
      const byRoom = point.by_rooms?.find((r) => r.room === selectedRoom)
      return byRoom?.avg_trans_value_per_area
    }

    if (sampled.onlyGlobal) {
      const data = sampled.names
        .map((name) => {
          const gPoint = global.find((p) => p.name === name)
          const gVal = getValue(gPoint, selectedGlobalRoom)
          if (gVal == null) return null
          return { name, global: gVal / exchangeRate }
        })
        .filter(Boolean) as Array<{ name: string; global: number }>
      return { onlyGlobal: true as const, data }
    }

    const data = sampled.names
      .map((name) => {
        const aPoint = byArea.find((p) => p.name === name)
        const gPoint = global.find((p) => p.name === name)
        const aVal = getValue(aPoint, selectedByAreaRoom)
        const gVal = getValue(gPoint, selectedGlobalRoom)
        if (aVal == null || gVal == null) return null
        return { name, byArea: aVal / exchangeRate, global: gVal / exchangeRate }
      })
      .filter(Boolean) as Array<{ name: string; byArea: number; global: number }>
    return { onlyGlobal: false as const, data }
  }, [sampled, priceGraph, exchangeRate, selectedByAreaRoom, selectedGlobalRoom])

  const avg = useMemo(() => {
    if (displayData.onlyGlobal || !displayData.data.length) return 0
    return (
      displayData.data.reduce((sum, d) => sum + (d as { byArea: number }).byArea, 0) /
      displayData.data.length
    )
  }, [displayData])

  if (isLoading) return <div className='text-gray-500'>{t('developerChart.loading')}</div>
  if (!displayData.data?.length) return null

  return (
    <div>
      <h3 className='mb-2 text-2xl font-semibold mt-12 '>{t('developerChart.title')}</h3>
      <p className='text-gray-500 text-xs mb-2'>Data from Dubai Land Department</p>
      {displayData.onlyGlobal && (
        <div className='mb-2 text-gray-500'>{t('developerChart.onlyGlobalNote')}</div>
      )}

      <div className='flex flex-wrap items-center gap-3 mb-4'>
        {!displayData.onlyGlobal && (
          <div className='flex items-center gap-2'>
            <label className='text-sm text-muted-foreground'>{t('developerChart.byArea')}</label>
            <select
              className='text-sm border border-border rounded-md px-2 py-1 bg-background'
              value={selectedByAreaRoom}
              onChange={(e) => setSelectedByAreaRoom(e.target.value)}
            >
              <option value=''>{'All'}</option>
              {byAreaRooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className='flex items-center gap-2'>
          <label className='text-sm text-muted-foreground'>{t('developerChart.global')}</label>
          <select
            className='text-sm border border-border rounded-md px-2 py-1 bg-background'
            value={selectedGlobalRoom}
            onChange={(e) => setSelectedGlobalRoom(e.target.value)}
          >
            <option value=''>{'All'}</option>
            {globalRooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className='w-full h-[340px] md:h-[400px] aspect-auto overflow-hidden'
      >
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={displayData.data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
            <defs>
              <linearGradient id='byAreaGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#2563eb' stopOpacity={0.9} />
                <stop offset='100%' stopColor='#2563eb' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='globalGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#94a3b8' stopOpacity={0.8} />
                <stop offset='100%' stopColor='#94a3b8' stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray='4 8' strokeOpacity={0.08} />
            <XAxis
              dataKey='name'
              tick={{ fontSize: 12 }}
              tickMargin={8}
              tickFormatter={(val) => val.slice(0, 5)}
            />
            {/* <YAxis
              tickFormatter={(val) => `${formatPrice(Number(val))}`}
              width={80}
              tick={{ fontSize: 12 }}
              domain={['dataMin - 2', 'dataMax + 4']}
            /> */}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {!displayData.onlyGlobal && (
              <ReferenceLine
                y={avg}
                stroke='rgba(0,0,0,0.08)'
                strokeDasharray='3 3'
                label={{
                  value: t('developerChart.avgByArea'),
                  position: 'top',
                  fill: '#6b7280',
                  fontSize: 11,
                }}
              />
            )}
            {!displayData.onlyGlobal && (
              <Bar
                dataKey='byArea'
                name={t('developerChart.byArea')}
                fill='url(#byAreaGradient)'
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={1000}
              />
            )}
            <Bar
              dataKey='global'
              name={t('developerChart.global')}
              fill='url(#globalGradient)'
              radius={[4, 4, 0, 0]}
              isAnimationActive
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

export { DeveloperChartContainer }
