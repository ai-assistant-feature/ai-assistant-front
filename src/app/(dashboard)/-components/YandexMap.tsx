import { FC, useEffect, useRef, useState } from 'react'

interface IProps {
  address?: string // Make address optional
}

const YandexMap: FC<IProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const defaultAddress = 'Dubai Mall, Dubai, UAE'
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return

      // @ts-ignore - Yandex Maps API
      const ymaps3 = window.ymaps3
      console.log('YMaps API status:', !!ymaps3)

      if (!ymaps3) {
        console.error('Yandex Maps API not loaded')
        return
      }

      const searchAddress = address || defaultAddress
      console.log('Searching for address:', searchAddress)

      // Initialize the map if it hasn't been initialized yet
      if (!map.current) {
        console.log('Initializing map...')
        try {
          map.current = new ymaps3.YMap(mapRef.current, {
            location: {
              center: [55.2796, 25.1971], // Default coordinates (Dubai Mall)
              zoom: 15,
            },
          })

          // Add map controls
          map.current.addChild(new ymaps3.YMapDefaultSchemeLayer())
          map.current.addChild(new ymaps3.YMapDefaultFeaturesLayer())
          map.current.addChild(new ymaps3.YMapControls({ position: 'right' }))
          console.log('Map initialized successfully')

          // Add marker for default location
          const marker = new ymaps3.YMapMarker({
            coordinates: [55.2796, 25.1971],
            draggable: false,
          })
          map.current.addChild(marker)
        } catch (error) {
          console.error('Error initializing map:', error)
        }
      }

      setIsLoading(false)
    }

    // Check if API is loaded
    const checkAndInitMap = () => {
      // @ts-ignore
      if (window.ymaps3) {
        initMap()
      } else {
        // If not loaded, wait and try again
        setTimeout(checkAndInitMap, 500)
      }
    }

    checkAndInitMap()

    return () => {
      if (map.current) {
        map.current.destroy()
        map.current = null
      }
    }
  }, [])

  // Effect for handling address changes
  useEffect(() => {
    if (!map.current || isLoading) return

    const searchAddress = address || defaultAddress
    // @ts-ignore
    const ymaps3 = window.ymaps3

    ymaps3.geocoding
      .search(searchAddress)
      .then((response: any) => {
        console.log('Geocoding response:', response)
        if (response.features.length > 0) {
          const coordinates = response.features[0].geometry.coordinates
          console.log('Found coordinates:', coordinates)

          // Remove previous markers if they exist
          map.current.children.each((child: any) => {
            if (child instanceof ymaps3.YMapMarker) {
              map.current.removeChild(child)
            }
          })

          // Add marker
          const marker = new ymaps3.YMapMarker({
            coordinates: coordinates,
            draggable: false,
          })

          map.current.addChild(marker)

          // Center map on the found location
          map.current.setLocation({
            center: coordinates,
            zoom: 15,
          })
        }
      })
      .catch((error: any) => {
        console.error('Geocoding error:', error)
      })
  }, [address, isLoading])

  return (
    <div
      ref={mapRef}
      className='w-full h-[300px] rounded-lg overflow-hidden my-4 border border-gray-200'
    >
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center bg-gray-100'>
          Loading map...
        </div>
      )}
    </div>
  )
}

export { YandexMap }
