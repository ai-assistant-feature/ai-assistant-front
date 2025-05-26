import { FC, useEffect, useRef, useState } from 'react'

interface IProps {
  address?: string
}

declare global {
  interface Window {
    ymaps: any
  }
}

const YandexMap: FC<IProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const defaultAddress = 'Dubai Mall, Dubai, UAE'
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          const searchAddress = address || defaultAddress

          // Initialize the map if it hasn't been initialized yet
          if (!map.current) {
            map.current = new ymaps.Map(mapRef.current, {
              center: [25.1971, 55.2796], // Default coordinates (Dubai Mall)
              zoom: 15,
              controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
            })

            // Create a placemark
            const placemark = new ymaps.Placemark(
              map.current.getCenter(),
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

          // Search for the address and update map
          ymaps.geocode(searchAddress).then((res: any) => {
            const firstGeoObject = res.geoObjects.get(0)
            if (firstGeoObject) {
              const coords = firstGeoObject.geometry.getCoordinates()
              map.current.setCenter(coords, 15)

              // Update placemark position
              map.current.geoObjects.removeAll()
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
  }, [address])

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
