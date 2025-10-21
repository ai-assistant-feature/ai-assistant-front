import { FC } from 'react'
// components
import { GoogleMap } from '@app/-common/containers/GoogleMap'

interface Location {
  name: string
  coordinates: string
}

interface ChatMapProps {
  locations?: Location[]
}

export const ChatMap: FC<ChatMapProps> = ({ locations = [] }) => {
  // Если нет локаций, показываем дефолтную
  if (!locations || locations.length === 0) {
    return (
      <div className='w-full h-full'>
        <GoogleMap address='Дубай Молл' />
      </div>
    )
  }

  // Берем первую локацию как основную для карты
  const firstLocation = locations[0]

  return (
    <div className='w-full h-full'>
      <GoogleMap
        address={firstLocation.name}
        coordinates={firstLocation.coordinates}
        markers={locations.map((location) => ({
          name: location.name,
          coordinates: location.coordinates,
        }))}
      />
    </div>
  )
}
