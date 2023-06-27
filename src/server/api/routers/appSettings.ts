import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const appSettingsRouter = createTRPCRouter({
  getAllSettings: protectedProcedure.query(({ ctx }) => {
    const settings = ctx.prisma.appSettings.findFirst()
    if(!settings) {
      throw new Error('No settings found')
    }
    return settings
  }),

  updateAppSettings: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        fragmentDotColor: z.string(),
        fragmentDotLineColor: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, fragmentDotColor, fragmentDotLineColor } = input
      return await ctx.prisma.appSettings.update({
        where: { id },
        data: { fragmentDotColor, fragmentDotLineColor },
      })
    }),
})
