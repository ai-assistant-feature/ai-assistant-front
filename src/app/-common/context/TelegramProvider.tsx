import { ReactNode, createContext, useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
import img from '@/assets/Brazil_gilby.png'

interface TelegramContextProps {
  theme: 'light' | 'dark'
  user: {
    id: number
    firstName: string
    lastName?: string
    username?: string
    photoUrl?: string
  }
}

export const TelegramContext = createContext<TelegramContextProps | null>(null)

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [user, setUser] = useState<TelegramContextProps['user'] | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Для тестовой среды возвращаем тестовые данные
      setUser({
        id: 12345,
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        photoUrl: img,
      })
      setTheme('light') // Для теста ставим светлую тему
    } else {
      if (!WebApp) return

      // Инициализация WebApp
      WebApp.ready()
      WebApp.expand()

      // Устанавливаем тему
      const currentTheme = WebApp.themeParams?.bg_color ? 'dark' : 'light'
      setTheme(currentTheme)

      // Получаем данные пользователя
      const userData = WebApp.initDataUnsafe?.user
      if (userData) {
        setUser({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          username: userData.username,
          photoUrl: userData.photo_url,
        })
      }
    }
  }, [])

  // Если нет данных о пользователе, выводим альтернативный контент
  if (!user) {
    return (
      <div className='flex items-center justify-center h-screen'>Пользователь не авторизован</div>
    )
  }

  return (
    <TelegramContext.Provider value={{ theme, user }}>
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </TelegramContext.Provider>
  )
}
