
import { z } from 'zod'

const DateRangeSchema = z.object({
  from: z.optional(z.date()),
  to: z.optional(z.date()),
})

export const DownloadSettingsSchema = z.object({
  selectedUsers: z.array(z.string()),
  selectedSublevels: z.array(z.string()),
  worksheets: z.array(z.string()),
  selectedGameModes: z.array(z.string()),
  date: z.optional(DateRangeSchema),
})
