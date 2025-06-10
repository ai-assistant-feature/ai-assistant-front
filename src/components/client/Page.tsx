import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type IProps = {
  children?: React.ReactNode
  className?: string
}

const Navbar: FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex items-center h-[--page-header-height] px-[20px] shrink-0 bg-background border-b',
        className,
      )}
    >
      {children}
    </div>
  )
}

const Content: FC<IProps> = ({ children, className }) => {
  return <div className={cn('px-[20px] py-[16px] grow bg-background', className)}>{children}</div>
}

type IPageProps = {
  children?: React.ReactNode
  isBusy?: boolean
}

interface IPage {
  Navbar: typeof Navbar
  Content: typeof Content
}

const Page: FC<IPageProps> & IPage = ({ children, isBusy }) => {
  return (
    <div
      className={cn(
        'container mx-auto flex flex-col bg-background h-svh pb-[env(safe-area-inset-bottom)]',
      )}
    >
      {children}
      {isBusy && <Loader2 className='text-primary' />}
    </div>
  )
}

Page.Navbar = Navbar
Page.Content = Content

export { Page }
