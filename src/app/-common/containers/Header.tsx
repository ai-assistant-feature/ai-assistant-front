import { useState } from 'react'
import { usePropertiesQuery } from '@app/-common/-api/getProperties.query'
import { HeaderContent } from '../components/HeaderContent'
import { HeaderDropdown } from '../components/HeaderDropdown'

const Header = () => {
  const { data, isLoading, isFetching } = usePropertiesQuery()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  return (
    <>
      <HeaderContent onToggleDropdown={toggleDropdown} />
      {showDropdown && (
        <HeaderDropdown isLoading={isLoading} isFetching={isFetching} items={data?.items} />
      )}
    </>
  )
}

export { Header }
