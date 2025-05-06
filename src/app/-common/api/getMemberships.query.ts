import { useQuery } from '@tanstack/react-query'
import { supabase } from '@app/-common/supabaseClient'

interface Membership {
  userId: number
  communityId: number
  status: 'joined' | 'pending' | 'rejected' | 'accepted'
}

// Функция для получения всех сообществ пользователя
const fetchMemberships = async (userId: number): Promise<Membership[]> => {
  const { data, error } = await supabase
    .from('community_memberships')
    .select('*')
    .eq('userId', userId) // Получаем все записи по userId

  if (error) {
    console.error('Ошибка запроса memberships:', error)
    throw new Error(error.message) // Выбрасываем ошибку, если она критическая
  }

  return data || [] // Если данных нет, вернется пустой массив
}

// Хук для получения всех сообществ пользователя
const useGetMemberships = (userId: number) => {
  return useQuery<Membership[]>({
    queryKey: ['memberships', userId],
    queryFn: () => fetchMemberships(userId),
  })
}

export { useGetMemberships }
