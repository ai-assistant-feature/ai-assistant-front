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
import { useGetPriceGraphQuery } from '../api/getPriceGraph.query'
import { useMemo } from 'react'

/**
 * Преобразует строку недели вида "06.01.2025" (ДД.ММ.ГГГГ)
 * в числовое значение времени (timestamp), чтобы можно было корректно сортировать по дате.
 */
const parseWeekDate = (week: string) => {
  const [d, m, y] = week.split('.')
  const year = Number(y)
  const month = Number(m) - 1
  const day = Number(d)
  return new Date(year, month, day).getTime()
}

/**
 * Конфигурация для визуализации графика (используется в ChartContainer).
 */
const chartConfig = {
  avg: {
    label: 'Цена/м²',
    color: '#2563eb',
  },
} satisfies ChartConfig

/**
 * Форматирует изменение в процентах между текущей и предыдущей неделей.
 */
const formatPctChange = (current: number | undefined, prev: number | undefined) => {
  if (current == null || prev == null) return ''
  const diff = ((current - prev) / prev) * 100
  const sign = diff > 0 ? '+' : ''
  return `${sign}${diff.toFixed(1)}%`
}

/**
 * Кастомный тултип для показа детальной информации при наведении.
 */
type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
  data: Array<{ week: string; avg: number }>
}

const CustomTooltip = ({ active, payload, label, data }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null
  const cur = payload[0].value
  const idx = data.findIndex((d) => d.week === label)
  const prev = idx > 0 ? data[idx - 1].avg : undefined

  return (
    <div className='bg-white/95 p-3 rounded-lg shadow-md text-sm'>
      <div className='font-medium'>{label}</div>
      <div>Цена/м²: {Number(cur).toLocaleString()} AED</div>
      {prev !== undefined && (
        <div className='text-xs text-slate-600'>Изменение: {formatPctChange(cur, prev)}</div>
      )}
    </div>
  )
}

/**
 * Основной компонент графика изменения цены за м².
 */
const DeveloperChartContainer = ({ propertyId }: { propertyId: string }) => {
  // Запрашиваем данные по графику цен
  const { data: priceGraph } = useGetPriceGraphQuery({ propertyId })

  /**
   * Формируем данные для графика:
   * 1. Берём массив `by_area` из API.
   * 2. Сортируем по дате недели.
   * 3. Берём последние 46 записей (чтобы не перегружать график).
   * 4. Если данных больше 10 — оставляем только 10 равномерно распределённых точек.
   */
  const chartData = useMemo(() => {
    const source = priceGraph?.by_area ?? []
    if (!source.length) return [] as Array<{ week: string; avg: number }>

    // Сортируем по дате (от старых к новым)
    const sorted = [...source].sort((a, b) => parseWeekDate(a.week) - parseWeekDate(b.week))

    // Берём последние 46 недель (если меньше — берём всё)
    const limited = sorted.slice(-46)

    // Если данных 10 или меньше — просто возвращаем всё
    if (limited.length <= 10) {
      return limited.map((p) => ({
        week: p.week,
        avg: p.avg_trans_value_per_area,
      }))
    }

    // === Новый алгоритм ===
    // Рассчитываем шаг (равномерное распределение)
    const step = (limited.length - 1) / 9 // хотим 10 точек → 9 промежутков
    const sampled: typeof limited = []

    // Берём 10 точек: первую, последнюю и промежуточные
    for (let i = 0; i < 10; i++) {
      const index = Math.round(i * step)
      sampled.push(limited[index])
    }

    // Формируем итоговую структуру данных для графика
    return sampled.map((p) => ({
      week: p.week,
      avg: p.avg_trans_value_per_area,
    }))
  }, [priceGraph])

  /**
   * Вычисляем среднюю цену (для линии ReferenceLine)
   */
  const avg = useMemo(() => {
    if (!chartData.length) return 0
    return chartData.reduce((s, d) => s + d.avg, 0) / chartData.length
  }, [chartData])

  return (
    <div>
      <h3>График изменения цены за м²</h3>
      <ChartContainer
        config={chartConfig}
        className='w-full h-[340px] md:h-[400px] aspect-auto overflow-hidden'
      >
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
            {/* Градиент для заливки столбцов */}
            <defs>
              <linearGradient id='rentBarGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='var(--color-rent, #2563eb)' stopOpacity={0.9} />
                <stop offset='100%' stopColor='var(--color-rent, #2563eb)' stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* Сетка */}
            <CartesianGrid strokeDasharray='4 8' strokeOpacity={0.08} />

            {/* Ось X — короткий формат даты */}
            <XAxis
              dataKey='week'
              tick={{ fontSize: 12 }}
              tickMargin={8}
              tickFormatter={(val) => val.slice(0, 5)} // "ДД.ММ"
            />

            {/* Ось Y — форматируем число и добавляем единицы */}
            <YAxis
              tickFormatter={(val) => `${Number(val).toFixed(0)}`}
              width={50}
              tick={{ fontSize: 12 }}
              domain={['dataMin - 2', 'dataMax + 4']}
            />

            {/* Тултип с кастомным контентом */}
            <Tooltip content={<CustomTooltip data={chartData} />} />

            {/* Легенда */}
            <Legend />

            {/* Линия среднего значения */}
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

            {/* Основные столбцы графика */}
            <Bar
              dataKey='avg'
              fill='url(#rentBarGradient)'
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
