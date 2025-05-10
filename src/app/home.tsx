import { createFileRoute } from '@tanstack/react-router'
import logo from '@/assets/logo.jpeg'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <img src={logo} alt='Logo' className='w-40 h-40 object-contain rounded-[8px]' />
    </div>
  )
}
