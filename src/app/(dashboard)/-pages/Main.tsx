import { useEffect, useState } from 'react'
import { Page } from '@/components/client/Page'
import { Chat } from '../-components/Chat'
import logo from '@/assets/logo.jpeg'
import { Header } from '@app/-common/components/Header'

const Main = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false)
    }, 1000) // 1 секунда

    return () => clearTimeout(timeout)
  }, [])

  if (showSplash) {
    return (
      <div className='min-h-screen flex items-center justify-center w-full'>
        <img src={logo} alt='Logo' className='w-20 h-20 object-contain rounded-[8px]' />
      </div>
    )
  }

  return (
    <Page>
      <Page.Content>
        <Header />

        <Chat />
      </Page.Content>
    </Page>
  )
}

export { Main }
