import { TDeveloperComplex } from '@app/-common/schemas/developerComplex.schema'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  developerObjectData: TDeveloperComplex
}

const DetailsDeveloperComponent = ({ developerObjectData }: IProps) => {
  const { t } = useTranslation()
  const developer = developerObjectData.developer_data
  if (!developer) return null

  const developerLogoUrl =
    developer?.logo_image && developer.logo_image.length > 0
      ? developer.logo_image[0]?.url
      : undefined

  const developerWebsiteHost = (() => {
    if (!developer?.website) return undefined
    try {
      const url = new URL(developer.website)
      return url.host
    } catch {
      return developer?.website
    }
  })()

  const description = developer.description
  const PREVIEW_LENGTH = 360
  const isLong = !!description && description.length > PREVIEW_LENGTH
  const [expanded, setExpanded] = useState(false)

  const textToRender =
    expanded || !isLong ? description : `${description?.slice(0, PREVIEW_LENGTH)}…`

  return (
    <div className='mb-4'>
      <h3 className='text-xl font-semibold mb-3'>{t('property.developer')}</h3>
      <div className='flex items-center gap-3 mb-2'>
        {developerLogoUrl && (
          <img
            src={developerLogoUrl}
            alt={developer.name}
            className='h-10 w-10 rounded object-cover border border-border'
          />
        )}
        <div className='flex flex-col'>
          <span className='font-semibold'>{developer.name}</span>
          {developer.website && (
            <a
              href={developer.website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary text-sm hover:underline'
            >
              {developerWebsiteHost}
            </a>
          )}
        </div>
      </div>
      {developer.office_address && (
        <div className='text-sm text-muted-foreground mb-2'>{developer.office_address}</div>
      )}
      {description && (
        <>
          <div className='prose prose-sm dark:prose-invert text-sm'>
            <ReactMarkdown>{textToRender}</ReactMarkdown>
          </div>
          {isLong && (
            <button
              type='button'
              onClick={() => setExpanded((v) => !v)}
              className='mt-2 text-primary text-sm font-medium hover:underline'
            >
              {expanded ? t('common.showLess') : t('common.showMore')}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export { DetailsDeveloperComponent }
