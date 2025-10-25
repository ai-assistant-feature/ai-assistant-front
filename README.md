# Dubai Apartment PWA

Современное Progressive Web Application для управления квартирами в Дубае, построенное с использованием React, TypeScript и Vite.

## 🚀 Технологии

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite 6
- **Routing:** TanStack Router
- **State Management:** TanStack Query
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form + Zod
- **Internationalization:** i18next
- **Maps:** Yandex Maps
- **PWA Support:** Vite PWA Plugin
- **Animation:** Framer Motion
- **Telegram Integration:** TWA SDK

## 📦 Установка

```bash
# Клонирование репозитория
git clone [repository-url]

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## 🏗️ Структура проекта

```
├── public/                 # Статические файлы
│   ├── splashscreens/     # Изображения для сплешскринов
│   └── icons/            # Иконки приложения
├── src/
│   ├── app/              # Маршруты приложения
│   ├── assets/           # Статические ресурсы
│   ├── components/       # React компоненты
│   ├── hooks/            # Пользовательские хуки
│   ├── i18n/             # Файлы локализации
│   ├── lib/              # Утилиты и конфигурации
│   └── helpers/          # Вспомогательные функции
├── vite.config.ts        # Конфигурация Vite
└── package.json          # Зависимости и скрипты
```

## 🌐 PWA Функциональность

Приложение поддерживает все основные возможности PWA:

- **Установка на устройство:** Доступно для установки на iOS и Android
- **Оффлайн режим:** Работает без интернета благодаря сервис-воркеру
- **Сплешскрины:** Кастомные заставки для iOS и Android
- **Push-уведомления:** Поддержка push-уведомлений (в разработке)

### iOS Сплешскрины

Поддерживаются следующие разрешения:

- iPhone 5/SE: 640x1136
- iPhone 6/7/8: 750x1334
- iPhone Plus: 1242x2208
- iPad: 2048x2732

### Android Сплешскрины

Используется автоматическая генерация на основе:

- Иконки 512x512
- Цвета фона из манифеста

## 🗺️ Интеграция с Яндекс.Картами

Приложение использует Яндекс.Карты для отображения локаций. Инициализация карт происходит в React-компонентах для корректной работы с DOM.

## 🌍 Интернационализация

Поддерживается мультиязычность через i18next:

- Автоопределение языка браузера
- Ручной выбор языка
- Поддержка RTL (в разработке)

## 🎨 UI/UX

- Современный дизайн с использованием Tailwind CSS
- Адаптивная верстка
- Анимации через Framer Motion
- Доступность (a11y) через Radix UI
- Темная/светлая тема

## 🔧 Разработка

### Скрипты

```bash
npm run dev        # Запуск в режиме разработки
npm run build      # Сборка для продакшена
npm run preview    # Предпросмотр продакшен сборки
npm run lint       # Проверка кода линтером
```

### Линтинг и форматирование

- ESLint для проверки кода
- Prettier для форматирования
- TypeScript для типизации

## 📱 Поддерживаемые браузеры

- Chrome (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- Edge (последние 2 версии)

## 🔐 Безопасность

- HTTPS обязателен для PWA функциональности
- Безопасная обработка API ключей
- Защита от XSS через React
- Валидация форм через Zod

## 📄 Лицензия

[Укажите вашу лицензию]

---

## 🔑 Настройка Firebase Auth

Создайте файл `.env` в корне проекта и добавьте ключи Firebase Web App:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Маршруты:

- `/login` — страница входа (Google sign-in)
- `/` — защищенный дашборд (редирект на `/login`, если не авторизован)
