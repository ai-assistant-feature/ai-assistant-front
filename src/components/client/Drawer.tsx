import { Drawer as VaulDrawer } from 'vaul'
import { FC, ReactNode } from 'react'
import { X } from 'lucide-react'

interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  shouldScaleBackground?: boolean
  title?: string
}

const Drawer: FC<IProps> = ({
  isOpen,
  onOpenChange,
  children,
  shouldScaleBackground = true,
  title,
}) => {
  return (
    <VaulDrawer.Root
      shouldScaleBackground={shouldScaleBackground}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className='fixed inset-0 bg-black/40 z-50' />
        <VaulDrawer.Content className='bg-background flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px] z-50'>
          <div className='p-4 bg-background rounded-t-[10px] flex-1 overflow-y-auto scrollbar-hide'>
            <div className='max-w-md mx-auto'>
              <div className='flex items-center justify-between mb-4'>
                <div></div>
                <VaulDrawer.Title className='font-medium text-foreground'>
                  {title ?? <span className='sr-only'>Drawer</span>}
                </VaulDrawer.Title>
                <button onClick={() => onOpenChange(false)}>
                  <X className='w-5 h-5 text-muted-foreground' />
                </button>
              </div>
              <div className='space-y-2'>{children}</div>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}

export { Drawer }
