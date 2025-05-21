// src/i18n/index.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/translation.json'
import ru from './locales/ru/translation.json'

i18n
  .use(LanguageDetector) // автоматически определяет язык
  .use(initReactI18next) // подключает react-i18next
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: 'ru', // устанавливаем русский язык по умолчанию
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // не экранируем HTML
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    debug: true, // включаем отладку
  })

// Добавляем обработчик для отслеживания изменения языка
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng)
})

export default i18n
