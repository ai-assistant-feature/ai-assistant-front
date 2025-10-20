import { TDeveloperComplex } from '@app/-common/schemas/developerComplex.schema'
import ReactMarkdown from 'react-markdown'

interface OverviewProps {
  developerObjectData: TDeveloperComplex
}

const Overview = ({ developerObjectData }: OverviewProps) => {
  if (!developerObjectData.overview) return null

  return (
    <div className='mb-4'>
      <ReactMarkdown>{developerObjectData.overview}</ReactMarkdown>
    </div>
  )
}

export { Overview }
