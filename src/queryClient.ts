import { QueryClient } from '@tanstack/react-query'

const handleError = (error: unknown) => {
  // if (error instanceof AxiosError && error.response?.status === 401) {
  //     removeToken()
  //     void router.navigate({
  //         to: "/auth"
  //     })
  // }
  console.error(error)
  return false
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: handleError,
      retry: false,
    },
    mutations: {
      onError: handleError,
      retry: false,
    },
  },
})

export { queryClient }
