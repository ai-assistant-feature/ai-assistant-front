import { httpService } from '@/helpers/api'
import { useQuery } from '@tanstack/react-query'
import { TSupportedBtns } from '../schemas/supportedBtns.schema'

const supportedBtnsQueryKey = ['supportedBtns'] as const

export const fetchGetSupportedBtns = async (): Promise<TSupportedBtns> => {
  const response = await httpService.get(`/api/v1/variables/supported_btns`)
  return response.data
}

const useGetSupportedBtnsQuery = () => {
  return useQuery({
    queryKey: supportedBtnsQueryKey,
    queryFn: () => fetchGetSupportedBtns(),
  })
}

export { useGetSupportedBtnsQuery }
