import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@app/-common/supabaseClient'
import { TCommunity } from '../-infra/form.infra'

const createCommunity = async (community: TCommunity) => {
  const { data, error } = await supabase.from('communities').insert([community]).select().single()

  if (error) throw new Error(error.message)
  return data
}

const useCreateCommunity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] })
    },
  })
}

export { useCreateCommunity }
