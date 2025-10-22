import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer } from '@/components/client/Drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { TDeveloperComplex } from '@app/-common/schemas/developerComplex.schema'
// containers
import { DetailsContainer } from '@app/-developerComplexes/containers/Details.container'

interface FlatDetailsOverlayProps {
  developerId: string | null
  onClose: () => void
  developerObjectData: TDeveloperComplex | null | undefined
  isLoadingDeveloperObject: boolean
}

const ComplexesOverlayContainer = ({
  developerId,
  onClose,
  developerObjectData,
  isLoadingDeveloperObject,
}: FlatDetailsOverlayProps) => {
  const isMobile = useIsMobile()
  const isOpen = !!developerId

  if (!isOpen) return null

  return isMobile ? (
    <Drawer isOpen={isOpen} onOpenChange={() => onClose()}>
      <div className='max-h-[85vh] overflow-y-auto scrollbar-hide'>
        <DetailsContainer
          developerObjectData={developerObjectData}
          isLoadingDeveloperObject={isLoadingDeveloperObject}
        />
      </div>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className='max-w-2xl p-0 sm:p-6 md:max-h-[90vh] sm:max-h-[85vh] max-h-[100vh] w-[95vw] sm:w-full overflow-y-auto scrollbar-hide'>
        <>
          <DialogHeader className='p-4 sm:p-0'>
            <DialogTitle className='text-2xl font-bold text-foreground'>
              {developerObjectData?.name}
            </DialogTitle>
          </DialogHeader>
          <DetailsContainer
            developerObjectData={developerObjectData}
            isLoadingDeveloperObject={isLoadingDeveloperObject}
          />
        </>
      </DialogContent>
    </Dialog>
  )
}

export { ComplexesOverlayContainer }
