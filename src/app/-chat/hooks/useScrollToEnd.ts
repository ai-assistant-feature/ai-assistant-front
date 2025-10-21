import { RefObject, useEffect } from 'react'

export const useScrollToEnd = <T extends Element>(ref: RefObject<T | null>, deps: any[] = []) => {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
