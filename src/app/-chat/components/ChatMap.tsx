import { FC } from 'react'
// components
import { YandexMap } from '@app/-chat/components/YandexMap'

export const ChatMap: FC = () => {
  const firstLocation = 'Дубай Молл'

  return (
    <div className='w-full h-full'>
      <YandexMap address={firstLocation} />
    </div>
  )
}
