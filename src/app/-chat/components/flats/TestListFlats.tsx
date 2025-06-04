import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Flat } from './types'
import { testFlats } from './testData'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export const TestListFlats = () => {
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null)

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
            {testFlats.map((flat) => (
              <CarouselItem key={flat.id} className='pl-2 md:pl-4 basis-[85%] md:basis-[45%]'>
                <div
                  onClick={() => setSelectedFlat(flat)}
                  className='bg-white overflow-hidden cursor-pointer rounded-lg'
                >
                  <div className='relative h-40'>
                    <img src={flat.image} alt={flat.title} className='w-full h-full object-cover' />
                  </div>
                  <div className='p-3 bg-gray-50'>
                    <h3 className='text-base font-semibold mb-1 line-clamp-1'>{flat.title}</h3>
                    <div className='flex justify-between items-center'>
                      <div className='text-sm text-gray-600'>
                        {flat.rooms} комн. • {flat.area} м²
                      </div>
                      <div className='text-base font-bold'>{flat.price.toLocaleString()} ₽</div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Dialog open={!!selectedFlat} onOpenChange={() => setSelectedFlat(null)}>
        <DialogContent className='max-w-2xl p-0 sm:p-6 md:max-h-[90vh] sm:max-h-[85vh] max-h-[100vh] w-[95vw] sm:w-full'>
          {selectedFlat && (
            <>
              <DialogHeader className='p-4 sm:p-0'>
                <DialogTitle className='text-2xl font-bold'>{selectedFlat.title}</DialogTitle>
              </DialogHeader>

              <div className='relative h-64 sm:h-72 mb-4'>
                <img
                  src={selectedFlat.image}
                  alt={selectedFlat.title}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='space-y-4 p-4 sm:p-0'>
                <div className='flex items-center text-gray-700'>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  <span className='text-sm'>{selectedFlat.location}</span>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gray-50 p-3 rounded-lg'>
                    <div className='text-sm text-gray-600'>Комнаты</div>
                    <div className='text-lg font-semibold'>{selectedFlat.rooms}</div>
                  </div>
                  <div className='bg-gray-50 p-3 rounded-lg'>
                    <div className='text-sm text-gray-600'>Площадь</div>
                    <div className='text-lg font-semibold'>{selectedFlat.area} м²</div>
                  </div>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='text-sm text-gray-600'>Стоимость аренды</div>
                  <div className='text-2xl font-bold text-blue-600'>
                    {selectedFlat.price.toLocaleString()} ₽/мес
                  </div>
                </div>

                <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                  Связаться с агентом
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
