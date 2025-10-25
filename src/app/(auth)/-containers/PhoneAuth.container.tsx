import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@app/-common/context/AuthProvider'
import { useMemo, useState } from 'react'

export function PhoneAuthContainer() {
  const {
    sendPhoneCode,
    confirmPhoneCode,
    phoneVerificationInFlight,
    phoneConfirmationReady,
    phoneAuthError,
    resetPhoneAuth,
  } = useAuth()

  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [smsCode, setSmsCode] = useState<string>('')

  const phoneDisabled = useMemo(
    () => phoneVerificationInFlight || !phoneNumber,
    [phoneVerificationInFlight, phoneNumber],
  )

  return (
    <div className='space-y-3'>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Номер телефона</label>
        <Input
          type='tel'
          inputMode='tel'
          placeholder='+7 999 123-45-67'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      {/* reCAPTCHA container if visible mode ever used */}
      <div id='recaptcha-container' className='hidden' />
      {!!phoneAuthError && <p className='text-sm text-red-500'>{phoneAuthError}</p>}
      <div className='flex gap-2'>
        <Button
          id='phone-send-button'
          className='flex-1'
          variant='secondary'
          disabled={phoneDisabled}
          onClick={async () => {
            try {
              await sendPhoneCode(phoneNumber, {
                buttonId: 'phone-send-button',
                size: 'invisible',
              })
            } catch (err) {
              void err
            }
          }}
        >
          Отправить код
        </Button>
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Код из SMS</label>
        <Input
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          placeholder='123456'
          value={smsCode}
          onChange={(e) => setSmsCode(e.target.value)}
          disabled={!phoneConfirmationReady}
        />
      </div>
      <div className='flex gap-2'>
        <Button
          className='flex-1'
          disabled={!phoneConfirmationReady || !smsCode}
          onClick={async () => {
            try {
              await confirmPhoneCode(smsCode)
              setSmsCode('')
              setPhoneNumber('')
            } catch (err) {
              void err
            }
          }}
        >
          Подтвердить и войти
        </Button>
        <Button
          className='flex-1'
          variant='ghost'
          onClick={() => {
            resetPhoneAuth()
            setSmsCode('')
          }}
        >
          Сбросить
        </Button>
      </div>
    </div>
  )
}
