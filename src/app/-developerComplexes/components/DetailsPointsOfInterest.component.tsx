import { TDeveloperComplex } from '../schemas/developerComplex.schema'
import { FC } from 'react'

interface IProps {
  developerObjectData: TDeveloperComplex
}
const DetailsPointsOfInterestComponent: FC<IProps> = ({ developerObjectData }) => {
  const pointsOfInterest = developerObjectData.map_points || []
  if (!pointsOfInterest || pointsOfInterest.length === 0) return null

  return (
    <>
      <p className='text-bse font-medium mb-2'>Points of Interest</p>
      {pointsOfInterest.map((point: { name: string; distance_km?: number }) => (
        <div key={point.name}>
          <div className='flex items-center justify-between gap-3 mb-2'>
            <p className='text-xs truncate'>{point.name}</p>
            {point.distance_km !== undefined && (
              <span className='text-sm whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-muted-foreground'>
                {point.distance_km} km
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default DetailsPointsOfInterestComponent
