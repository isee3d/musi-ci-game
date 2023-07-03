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
  one: z.number().optional(),
  two: z.number().optional(),
  three: z.number().optional(),
  go: z.number().optional(),
})

export const appSettingsFormSchema = z.object({
  fragmentDotColor: z.string().min(1),
  fragmentDotLineColor: z.string().min(1),
})

export const questionFormSchema = z.object({
  question: z.string().min(1),
})
