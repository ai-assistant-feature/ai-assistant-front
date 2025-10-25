import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const rentData = [
  { year: '2010', rent: 18.2 },
  { year: '2011', rent: 15.6 },
  { year: '2012', rent: 13.8 },
  { year: '2013', rent: 14.5 },
  { year: '2014', rent: 15.0 },
  { year: '2015', rent: 13.4 },
  { year: '2016', rent: 12.1 },
  { year: '2017', rent: 11.8 },
  { year: '2018', rent: 11.0 },
  { year: '2019', rent: 10.5 },
  { year: '2020', rent: 10.0 },
  { year: '2021', rent: 12.6 },
  { year: '2022', rent: 15.8 },
  { year: '2023', rent: 20.4 },
  { year: '2024', rent: 27.5 },
]

const chartConfig = {
  rent: {
    label: 'Аренда ($/м²/мес)',
    color: '#2563eb',
  },
} satisfies ChartConfig

const formatPctChange = (current: number | undefined, prev: number | undefined) => {
  if (current == null || prev == null) return ''
  const diff = ((current - prev) / prev) * 100
  const sign = diff > 0 ? '+' : ''
  return `${sign}${diff.toFixed(1)}%`
}

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null
  const cur = payload[0].value
  const idx = rentData.findIndex((d) => d.year === label)
  const prev = idx > 0 ? rentData[idx - 1].rent : undefined

  return (
    <div className='bg-white/95 p-3 rounded-lg shadow-md text-sm'>
      <div className='font-medium'>{label}</div>
      <div>Аренда: ${cur.toFixed(2)} / м² / мес</div>
      {prev !== undefined && (
        <div className='text-xs text-slate-600'>Изменение: {formatPctChange(cur, prev)}</div>
      )}
    </div>
  )
}

const DubaiRentBarChart = () => {
  const avg = rentData.reduce((s, d) => s + d.rent, 0) / rentData.length

  return (
    <ChartContainer
      config={chartConfig}
      className='w-full h-[340px] md:h-[400px] aspect-auto overflow-hidden'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={rentData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id='rentBarGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='var(--color-rent, #2563eb)' stopOpacity={0.9} />
              <stop offset='100%' stopColor='var(--color-rent, #2563eb)' stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray='4 8' strokeOpacity={0.08} />
          <XAxis dataKey='year' tick={{ fontSize: 12 }} tickMargin={8} />
          <YAxis
            tickFormatter={(val) => `$${Number(val).toFixed(0)}`}
            width={30}
            tick={{ fontSize: 12 }}
            domain={['dataMin - 2', 'dataMax + 4']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine
            y={avg}
            stroke='rgba(0,0,0,0.08)'
            strokeDasharray='3 3'
            label={{
              value: 'Среднее',
              position: 'top',
              fill: '#6b7280',
              fontSize: 11,
            }}
          />
          <Bar
            dataKey='rent'
            fill='url(#rentBarGradient)'
            radius={[4, 4, 0, 0]}
            isAnimationActive
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default DubaiRentBarChart
