import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@app/-common/context/AuthProvider'
import { useEffect } from 'react'
import { PhoneAuthContainer } from './-containers/PhoneAuth.container'

function LoginPage() {
  const { signInWithGoogle, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate({ to: '/' })
    }
  }, [user, navigate])

  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl font-semibold'>Вход</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <Button className='w-full' onClick={signInWithGoogle}>
            Войти через Google
          </Button>
          <div className='flex items-center gap-2'>
            <Separator className='flex-1' />
            <span className='text-xs text-muted-foreground'>или</span>
            <Separator className='flex-1' />
          </div>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <div className='text-sm font-semibold'>Вход по номеру телефона</div>
              <PhoneAuthContainer />
            </div>
          </div>
          <p className='text-center text-xs text-muted-foreground'>
            Нажимая кнопку входа, вы соглашаетесь с{' '}
            <a href='#' className='underline hover:text-primary'>
              условиями использования
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})
