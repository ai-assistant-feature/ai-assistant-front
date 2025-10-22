import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import ReactMarkdown from 'react-markdown'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const DetailsOverviewComponent = ({ developerObjectData }: IProps) => {
  if (!developerObjectData.overview) return null

  return (
    <div className='mb-4'>
      <ReactMarkdown>{developerObjectData.overview}</ReactMarkdown>
    </div>
  )
}

export { DetailsOverviewComponent }
