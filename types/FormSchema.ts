import { z } from 'zod'

export const levelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  color: z.string().nullish(),
})
