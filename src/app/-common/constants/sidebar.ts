import { Globe, SquarePen } from 'lucide-react'

export const LANGUAGES = {
  en: 'English',
  ru: 'Русский',
} as const

export const SIDEBAR_ACTION_TYPES = {
  OPEN_LANGUAGE_DRAWER: 'OPEN_LANGUAGE_DRAWER',
  OPEN_NEW_CHAT: 'OPEN_NEW_CHAT',
} as const

export type SidebarActionType = (typeof SIDEBAR_ACTION_TYPES)[keyof typeof SIDEBAR_ACTION_TYPES]

export const SIDEBAR_ITEMS = [
  {
    titleKey: 'sidebar.newChat',
    icon: SquarePen,
    actionType: SIDEBAR_ACTION_TYPES.OPEN_NEW_CHAT,
  },
  {
    titleKey: 'sidebar.language',
    icon: Globe,
    showLanguage: true,
    actionType: SIDEBAR_ACTION_TYPES.OPEN_LANGUAGE_DRAWER,
  },
] as const
