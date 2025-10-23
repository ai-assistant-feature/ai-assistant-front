import { TDeveloperComplex } from '@app/-developerComplexes/schemas/developerComplex.schema'
import ReactMarkdown from 'react-markdown'

interface IProps {
  developerObjectData: TDeveloperComplex
}

// FIXME: вынести
const DetailsOverviewComponent = ({ developerObjectData }: IProps) => {
  if (!developerObjectData.overview) return null

  return (
    <div className='mb-4'>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className='text-3xl font-semibold leading-tight mb-3' {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className='text-2xl font-semibold leading-tight mb-3' {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className='text-xl font-semibold leading-snug mb-2.5' {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className='text-lg font-semibold leading-snug mb-2' {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className='text-base font-semibold leading-snug mb-2' {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className='text-sm font-semibold leading-snug mb-2' {...props} />
          ),
          p: ({ node, ...props }) => <p className='leading-relaxed mb-3' {...props} />,
          ul: ({ node, ...props }) => <ul className='list-disc pl-5 space-y-1 mb-3' {...props} />,
          ol: ({ node, ...props }) => (
            <ol className='list-decimal pl-5 space-y-1 mb-3' {...props} />
          ),
          li: ({ node, ...props }) => <li className='leading-relaxed' {...props} />,
          strong: ({ node, ...props }) => <strong className='font-semibold' {...props} />,
          em: ({ node, ...props }) => <em className='italic' {...props} />,
          a: ({ node, ...props }) => (
            <a className='text-primary underline underline-offset-2' {...props} />
          ),
          hr: ({ node, ...props }) => <hr className='my-4' {...props} />,
        }}
      >
        {developerObjectData.overview}
      </ReactMarkdown>
    </div>
  )
}

export { DetailsOverviewComponent }
