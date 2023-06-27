import { z } from 'zod'

export const levelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  color: z.string().nullish(),
})

export const sublevelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  color: z.string().nullish(),
  fragmentToShow: z.number().int().min(1),
})

export const teamFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
})

export const fragmentFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
})

export const gameModeFormSchema = z.object({
  name: z.string().min(1),
  one: z.number().min(100),
  two: z.number().min(100),
  three: z.number().min(100),
  go: z.number().min(100),
})
