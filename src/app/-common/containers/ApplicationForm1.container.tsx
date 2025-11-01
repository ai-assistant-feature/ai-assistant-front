import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer } from '@/components/client/Drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { ApplicationFormComponent } from '../components/ApplicationForm1.component'
// containers

const ApplicationFormContainer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const isMobile = useIsMobile()

  if (!isOpen) return null

  return isMobile ? (
    <Drawer isOpen={isOpen} onOpenChange={() => onClose()} title={'Chat with agent'}>
      <div className='max-h-[85vh] overflow-y-auto scrollbar-hide'>
        <ApplicationFormComponent />
      </div>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className='max-w-2xl p-0 sm:p-6 md:max-h-[90vh] sm:max-h-[85vh] max-h-[100vh] w-[95vw] sm:w-full overflow-y-auto scrollbar-hide'>
        <ApplicationFormComponent />
      </DialogContent>
    </Dialog>
  )
}

export { ApplicationFormContainer }
