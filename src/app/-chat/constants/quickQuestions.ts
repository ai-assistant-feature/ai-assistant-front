import { TFunction } from 'i18next'

type QuickQuestionItem = {
  id: string
  title: string
  subtitle: string
}

export const getQuickQuestions = (t: TFunction) =>
  (t('chat.quickQuestions', { returnObjects: true }) as QuickQuestionItem[]).map((item) => ({
    ...item,
    value: item.subtitle,
  }))
