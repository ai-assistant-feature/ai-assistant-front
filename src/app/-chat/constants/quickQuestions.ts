import { TFunction } from 'i18next'

export const getQuickQuestions = (t: TFunction) =>
  (t('chat.quickQuestions', { returnObjects: true }) as { title: string; subtitle: string }[]).map(
    (item) => ({
      ...item,
      value: item.subtitle,
    }),
  )
