import { useMutation } from '@tanstack/react-query'
import { httpService } from '@/helpers/api'

export function useSessionMutation() {
  return useMutation<void, Error, string>({
    mutationFn: async (token) => {
      await httpService.post(
        `/api/auth/set-firebase-cookie?token=${encodeURIComponent(token)}`,
        {},
        { withCredentials: true },
      )
    },
  })
}
