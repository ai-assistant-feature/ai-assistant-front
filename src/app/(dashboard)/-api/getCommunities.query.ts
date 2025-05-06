import { useQuery } from '@tanstack/react-query'
import { supabase } from '@app/-common/supabaseClient'

// Определение типа данных
interface Community {
  id: string
  name: string
  description: string
  imageUrl?: string
  created_at: string
  tags?: string
}

// Функция для получения данных с типом Community[]
const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase.from('communities').select('*')

  if (error) throw new Error(error.message)
  return data
}

// Хук с указанием типа данных
const useGetCommunities = () => {
  return useQuery<Community[]>({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  })
}

export { useGetCommunities }
