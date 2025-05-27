import { FC } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { YandexMap } from './YandexMap'
import { useTranslation } from 'react-i18next'

interface IProps {
  isOpen: boolean
  onClose: () => void
  address: string
}

const MapDialog: FC<IProps> = ({ isOpen, onClose, address }) => {
  const { t } = useTranslation()

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className='max-w-3xl'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('map.locationTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{address}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className='my-4'>
          <YandexMap address={address} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{t('common.close')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { MapDialog }
