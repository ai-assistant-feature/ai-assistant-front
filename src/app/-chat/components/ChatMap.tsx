import { FC } from 'react'
// components
import { YandexMap } from '@app/-common/containers/YandexMap'

export const ChatMap: FC = () => {
  // TODO: get location from backend
  const firstLocation = 'Дубай Молл'

  return (
    <div className='w-full h-full'>
      <YandexMap address={firstLocation} />
    </div>
  )
}
