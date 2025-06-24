import { FC, useEffect, useRef, useState } from 'react'

interface Marker {
  name: string
  coordinates: string
}

interface IProps {
  address?: string
  coordinates?: string
  markers?: Marker[]
}

declare global {
  interface Window {
    ymaps: any
  }
}

const YandexMap: FC<IProps> = ({ address, coordinates, markers = [] }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const defaultAddress = 'Dubai Mall, Dubai, UAE'
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Функция для парсинга координат
  const parseCoordinates = (coordString: string): [number, number] | null => {
    try {
      const [lat, lng] = coordString.split(',').map((coord) => parseFloat(coord.trim()))
      if (isNaN(lat) || isNaN(lng)) return null
      return [lat, lng]
    } catch {
      return null
    }
  }

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return

      const ymaps = window.ymaps
      if (!ymaps) {
        setError('Yandex Maps API not loaded')
        setIsLoading(false)
        return
      }

      ymaps.ready(() => {
        try {
          // Определяем начальные координаты
          let initialCoords: [number, number] = [25.1971, 55.2796] // Default coordinates (Dubai Mall)

          if (coordinates) {
            const parsedCoords = parseCoordinates(coordinates)
            if (parsedCoords) {
              initialCoords = parsedCoords
            }
          }

          // Initialize the map if it hasn't been initialized yet
          if (!map.current) {
            map.current = new ymaps.Map(mapRef.current, {
              center: initialCoords,
              zoom: 15,
              controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
            })
          } else {
            map.current.setCenter(initialCoords, 15)
          }

          // Очищаем существующие маркеры
          map.current.geoObjects.removeAll()

          // Добавляем маркеры
          if (markers && markers.length > 0) {
            markers.forEach((marker) => {
              const coords = parseCoordinates(marker.coordinates)
              if (coords) {
                const placemark = new ymaps.Placemark(
                  coords,
                  {
                    hintContent: marker.name,
                    balloonContent: marker.name,
                  },
                  {
                    preset: 'islands#redDotIcon',
                  },
                )
                map.current.geoObjects.add(placemark)
              }
            })
          } else {
            // Если нет маркеров, добавляем основной маркер по адресу или координатам
            const searchAddress = address || defaultAddress

            if (coordinates) {
              const coords = parseCoordinates(coordinates)
              if (coords) {
                const placemark = new ymaps.Placemark(
                  coords,
                  {
                    hintContent: searchAddress,
                    balloonContent: searchAddress,
                  },
                  {
                    preset: 'islands#redDotIcon',
                  },
                )
                map.current.geoObjects.add(placemark)
              }
            } else {
              // Поиск по адресу
              ymaps.geocode(searchAddress).then((res: any) => {
                const firstGeoObject = res.geoObjects.get(0)
                if (firstGeoObject) {
                  const coords = firstGeoObject.geometry.getCoordinates()
                  map.current.setCenter(coords, 15)

                  const placemark = new ymaps.Placemark(
                    coords,
                    {
                      hintContent: searchAddress,
                      balloonContent: searchAddress,
                    },
                    {
                      preset: 'islands#redDotIcon',
                    },
                  )
                  map.current.geoObjects.add(placemark)
                }
              })
            }
          }

          setIsLoading(false)
        } catch (err) {
          console.error('Error initializing map:', err)
          setError('Error initializing map')
          setIsLoading(false)
        }
      })
    }

    // Load Yandex Maps API if not already loaded
    if (!window.ymaps) {
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=en_US'
      script.async = true
      script.onload = initMap
      script.onerror = () => {
        setError('Failed to load Yandex Maps API')
        setIsLoading(false)
      }
      document.body.appendChild(script)
    } else {
      initMap()
    }

    return () => {
      if (map.current) {
        map.current.destroy()
        map.current = null
      }
    }
  }, [address, coordinates, markers])

  return (
    <div className='relative w-full h-[300px] rounded-lg overflow-hidden my-4 border border-gray-200'>
      <div ref={mapRef} className='w-full h-full' />
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75'>
          <span className='text-gray-600'>Loading map...</span>
        </div>
      )}
      {error && (
        <div className='absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-75'>
          <span className='text-red-600'>{error}</span>
        </div>
      )}
    </div>
  )
}

export { YandexMap }
