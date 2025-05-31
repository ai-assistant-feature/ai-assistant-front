import { FC } from 'react'
import { YandexMap } from './YandexMap'

export const ChatMap: FC = () => {
  const firstLocation = 'Дубай Молл'

  return (
    <div className='w-full h-full'>
      <YandexMap address={firstLocation} />
    </div>
  )
}
