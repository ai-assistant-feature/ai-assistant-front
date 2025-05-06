import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const App: FC<IProps> = ({ children }) => {
  // const { isLoading } = useGetUser(userId!)

  return children
}

export { App }
