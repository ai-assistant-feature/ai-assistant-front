import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type IProps = {
  children?: React.ReactNode
  className?: string
}
const Navbar: FC<IProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center h-[--page-header-height] px-[20px] shrink-0', className)}>
      {children}
    </div>
  )
}

const Content: FC<IProps> = ({ children, className }) => {
  return <div className={cn('px-[20px] py-[16px] grow', className)}>{children}</div>
}

interface IPage {
  displayName: string
  Navbar: typeof Navbar
  Content: typeof Content
}

interface IPageProps extends IProps {
  isBusy?: boolean
}
const Page: FC<IPageProps> & IPage = ({ children, isBusy }) => {
  return (
    <div
      className={cn(
        'container mx-auto flex flex-col bg-page h-svh pb-[env(safe-area-inset-bottom)]',
      )}
    >
      {children}
      {isBusy && <Loader2 />}
    </div>
  )
}

Page.displayName = 'Page'

Page.Navbar = Navbar
Page.Navbar.displayName = 'Page.Navbar'

Page.Content = Content
Page.Content.displayName = 'Page.Content'

export { Page }
