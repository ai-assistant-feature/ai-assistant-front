import { z } from 'zod'

export const SuppotedBtnsResponseSchema = z.object({
  supported_btns: z.array(
    z.object({
      btn_id: z.string(),
    }),
  ),
})

export type TSupportedBtns = z.infer<typeof SuppotedBtnsResponseSchema>
