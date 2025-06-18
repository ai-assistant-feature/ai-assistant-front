import { FC } from 'react'
// components
import { YandexMap } from '@app/-common/containers/YandexMap'

interface IProps {
  coordinates?: [number, number][]
}

export const ChatMap: FC<IProps> = ({ coordinates }) => {
  return (
    <div className='w-full h-full'>
      <YandexMap coordinates={coordinates} />
    </div>
  )
}
