import { useQuery } from '@tanstack/react-query'
import { supabase } from '@app/-common/supabaseClient'
import { TUser } from '@app/-common/infra/user.infra'

// Функция для получения или создания пользователя
const fetchUser = async (userId: number): Promise<TUser> => {
  const { data } = await supabase
    .from('users')
    .select('id') // Запрашиваем только id, т.к. username не храним
    .eq('id', userId)
    .single()

  // Если пользователя нет, создаем его
  if (!data) {
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .upsert([{ id: userId }]) // upsert предотвращает ошибки дубликатов
      .select('id')
      .single()

    if (insertError) throw new Error(insertError.message)
    return newUser
  }

  return data
}

const useGetUser = (userId: number) => {
  return useQuery<TUser>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // Запрос выполняется, только если есть userId
  })
}

export { useGetUser }
