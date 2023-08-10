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
  bpm: z.number().int().positive().min(1),
  fragmentToShow: z.number().int().positive().min(1),
})

export const teamFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
})

export const fragmentGroupFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  fragments: z.array(z.number().int().positive()),
})

export const fragmentFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  useAlways: z.boolean().default(false).optional(),
})

export const gameModeFormSchema = z.object({
  name: z.string().min(1),
  amountOfScenes: z.number().int().min(0).optional(),
  one: z.number().min(0).optional(),
  two: z.number().min(0).optional(),
  three: z.number().min(0).optional(),
  go: z.number().min(0).optional(),
})

export const appSettingsFormSchema = z.object({
  fragmentDotColor: z.string().min(1),
  fragmentDotLineColor: z.string().min(1),
})

export const questionFormSchema = z.object({
  question: z.string().min(1),
})

export const questionAnswerSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
})

export const questionAnswerFormSchema = z.array(questionAnswerSchema)
