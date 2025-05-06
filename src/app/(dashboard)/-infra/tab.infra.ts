export const TABS = {
  SUBSCRIPTIONS: {
    title: 'Подписки',
    value: 'subscriptions',
  },
  COMMUNITIES: {
    title: 'Сообщества',
    value: 'communities',
  },
} as const

export type TTab = (typeof TABS)[keyof typeof TABS]['value']
