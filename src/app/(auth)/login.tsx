import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@app/-common/context/AuthProvider'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function LoginPage() {
  const { signInWithGoogle, user } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      navigate({ to: '/' })
    }
  }, [user, navigate])

  return (
    <div className='flex h-screen items-center justify-center p-4 w-full'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl font-semibold'>{t('login.title')}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <Button className='w-full' onClick={signInWithGoogle}>
            {t('login.google')}
          </Button>
          <p className='text-center text-xs text-muted-foreground'>{t('login.subtitle')}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})
