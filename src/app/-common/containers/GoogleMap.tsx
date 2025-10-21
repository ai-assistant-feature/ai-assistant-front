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
    google: any
  }
}

const GoogleMap: FC<IProps> = ({ address, coordinates, markers = [] }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const defaultAddress = 'Dubai Mall, Dubai, UAE'

  const parseCoordinates = (coordString: string): { lat: number; lng: number } | null => {
    try {
      const [lat, lng] = coordString.split(',').map((coord) => parseFloat(coord.trim()))
      if (isNaN(lat) || isNaN(lng)) return null
      return { lat, lng }
    } catch {
      return null
    }
  }

  const addMarker = (position: { lat: number; lng: number }, title?: string) => {
    if (!map.current) return
    new window.google.maps.Marker({
      position,
      map: map.current,
      title,
    })
  }

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return

      const g = window.google
      if (!g || !g.maps) {
        setError('Google Maps API not loaded')
        setIsLoading(false)
        return
      }

      try {
        let initialCenter: { lat: number; lng: number } = { lat: 25.1971, lng: 55.2796 }

        if (coordinates) {
          const parsed = parseCoordinates(coordinates)
          if (parsed) initialCenter = parsed
        }

        if (!map.current) {
          map.current = new g.maps.Map(mapRef.current, {
            center: initialCenter,
            zoom: 15,
            disableDefaultUI: false,
            zoomControl: true,
            fullscreenControl: true,
          })
        } else {
          map.current.setCenter(initialCenter)
          map.current.setZoom(15)
        }

        // clear markers: Google Maps doesn't track globally; rely on re-render to recreate
        // Add markers
        if (markers && markers.length > 0) {
          const bounds = new g.maps.LatLngBounds()
          markers.forEach((m) => {
            const pos = parseCoordinates(m.coordinates)
            if (pos) {
              addMarker(pos, m.name)
              bounds.extend(pos)
            }
          })
          // Fit map to show all markers with some padding
          if (!bounds.isEmpty()) {
            if (typeof map.current.fitBounds === 'function') {
              // @ts-ignore padding is supported at runtime
              map.current.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 })
            } else {
              map.current.setCenter(bounds.getCenter())
            }
          }
        } else {
          const searchAddress = address || defaultAddress
          if (coordinates) {
            const pos = parseCoordinates(coordinates)
            if (pos) {
              map.current.setCenter(pos)
              addMarker(pos, searchAddress)
            }
          } else if (searchAddress) {
            const geocoder = new g.maps.Geocoder()
            geocoder.geocode({ address: searchAddress }, (results: any, status: any) => {
              if (status === 'OK' && results && results[0]) {
                const loc = results[0].geometry.location
                const center = { lat: loc.lat(), lng: loc.lng() }
                map.current.setCenter(center)
                addMarker(center, searchAddress)
              } else {
                setError('Geocoding failed')
              }
            })
          }
        }

        setIsLoading(false)
      } catch (err) {
        console.error('Error initializing Google Map:', err)
        setError('Error initializing map')
        setIsLoading(false)
      }
    }

    // load Google Maps script if needed
    const ensureScript = () => {
      if (window.google && window.google.maps) return initMap()

      const existing = document.querySelector(
        'script[data-google-maps]',
      ) as HTMLScriptElement | null
      if (existing) {
        existing.addEventListener('load', initMap, { once: true })
        existing.addEventListener(
          'error',
          () => {
            setError('Failed to load Google Maps API')
            setIsLoading(false)
          },
          { once: true },
        )
        return
      }

      const script = document.createElement('script')
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        setError('Missing Google Maps API key')
        setIsLoading(false)
        return
      }
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`
      script.async = true
      script.defer = true
      script.setAttribute('data-google-maps', 'true')
      script.addEventListener('load', initMap, { once: true })
      script.addEventListener(
        'error',
        () => {
          setError('Failed to load Google Maps API')
          setIsLoading(false)
        },
        { once: true },
      )
      document.body.appendChild(script)
    }

    ensureScript()

    return () => {
      // Google Maps JS API doesn't expose a destroy for Map; allow GC by removing ref
      map.current = null
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

export { GoogleMap }
