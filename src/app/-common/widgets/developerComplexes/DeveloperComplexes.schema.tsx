import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Drawer } from '@/components/client/Drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { FlatDetails } from './FlatDetails'
import { FlatCard } from './FlatCard'

interface TestListFlatsProps {
  flats?: any[]
}

const DeveloperComplexesWidget = ({ flats = [] }: TestListFlatsProps) => {
  const [selectedFlat, setSelectedFlat] = useState<any | null>(null)
  const isMobile = useIsMobile()

  // Если нет квартир, показываем сообщение
  if (!flats || flats.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p>К сожалению, по заданным параметрам ничего не найдено.</p>
        <p className='text-sm mt-2'>Попробуйте изменить критерии поиска.</p>
      </div>
    )
  }

  return (
    <>
      <div>
        <Carousel
          opts={{
            align: 'start',
            containScroll: 'trimSnaps',
          }}
          className='w-full'
        >
          <CarouselContent className='-ml-2 md:-ml-4'>
            {flats.map((flat) => (
              <CarouselItem key={flat.id} className='pl-2 md:pl-4 basis-[85%] md:basis-[45%]'>
                <FlatCard flat={flat} onSelect={setSelectedFlat} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {isMobile ? (
        <Drawer
          isOpen={!!selectedFlat}
          onOpenChange={() => setSelectedFlat(null)}
          title={selectedFlat?.title}
        >
          {selectedFlat && <FlatDetails flat={selectedFlat} />}
        </Drawer>
      ) : (
        <Dialog open={!!selectedFlat} onOpenChange={() => setSelectedFlat(null)}>
          <DialogContent className='max-w-2xl p-0 sm:p-6 md:max-h-[90vh] sm:max-h-[85vh] max-h-[100vh] w-[95vw] sm:w-full'>
            {selectedFlat && (
              <>
                <DialogHeader className='p-4 sm:p-0'>
                  <DialogTitle className='text-2xl font-bold text-foreground'>
                    {selectedFlat.title}
                  </DialogTitle>
                </DialogHeader>
                <FlatDetails flat={selectedFlat} />
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export { DeveloperComplexesWidget }
