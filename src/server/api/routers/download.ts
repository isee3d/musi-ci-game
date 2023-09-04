import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const downloadRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        participantId: true,
        role: true,
        isAllowedToPlay: true,
        createdAt: true,
      },
    })

    const levelResults = await ctx.prisma.levelResult.findMany({
      select: {
        user: {
          select: {
            participantId: true,
          },
        },
        startTime: true,
        endTime: true,
        score: true,
      },
    })

    return {
        users,
        levelResults,
    }
  }),
})
