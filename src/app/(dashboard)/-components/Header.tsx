import logo from '@/assets/logo.jpeg'

const Header = () => {
  return (
    <header className='w-full px-6 py-4'>
      <div className='max-w-7xl mx-auto flex items-center justify-center space-x-4'>
        {/* Логотип */}
        <img src={logo} alt='Logo' width='46' height='46' className='rounded-[8px]' />

        {/* Название */}
        <div className='text-2xl font-semibold '>House Scanner</div>
      </div>
    </header>
  )
}

export { Header }
