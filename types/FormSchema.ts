import { z } from 'zod'

const emptyStringToUndefined = z.literal('').transform(() => undefined)

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined)
}

export const levelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  color: z.string().nullish(),
  instrument: z.string().optional(),
  points: z
    .string()
    .transform((val) => (val === '' ? undefined : parseInt(val)))
    .nullable(),
})

export const sublevelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  color: z.string().nullish(),
  bpm: z.number().int().positive().min(1),
  fragmentToShow: z.coerce.number().int().positive().min(1),
  fragmentToShowLuisteren: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  fragmentToShowSpelen: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  fragmentToShowUitdaging: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  mFactor: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  pFactor: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  sFactor: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  tFactor: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  kFactor: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
})

export const teamFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
})

export const userFormSchema = z.object({
  userId: z.string().optional(),
  name: z.string().optional(),
  participantId: z.string().optional(),
  password: z.string().min(6).optional(),
  isAllowedToPlay: z.boolean().default(true),
  role: z.string().default('USER'),
})

export const fragmentGroupFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  fragments: z.array(z.number().int().positive()),
})

export const fragmentFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  useAlways: z.boolean().default(false),
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
  answerType: z.enum(['TEXT', 'NUMBER']),
})

export const questionAnswerSchema = z.object({
  id: z.number(), // Assuming you want to keep track of the question ID
  question: z.string().min(1),
  answer: z.string().min(1),
  answerType: z.string(), // Add this line
})

export const questionAnswerFormSchema = z.object({
  questionAnswers: z.array(questionAnswerSchema),
})

export const signInFormSchema = z.object({
  participantId: z.string().min(1),
  password: z.string().min(6),
})
