import { LevelOptionalDefaultsSchema, LevelSchema } from '@zod-prisma'
import { TRPCError } from '@trpc/server'
import { SubLevelSchema } from '@zod-prisma'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const levelRouter = createTRPCRouter({
  createLevel: protectedProcedure
    .input(LevelOptionalDefaultsSchema.extend({ sublevels: z.array(z.number().int()) }))
    .mutation(async ({ ctx, input }) => {
      const { sublevels, ...newInput } = input

      return await ctx.prisma.level.create({
        data: {
          ...newInput,
          subLevels: {
            connect: sublevels.map((id) => ({ id })),
          },
        },
      })
    }),

  getAllLevels: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.level.findMany()
  }),

  getSubLevelsOfLevel: protectedProcedure
    .input(z.object({ levelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { levelId } = input
      const subLevels = await ctx.prisma.level.findFirst({
        where: {
          id: parseInt(levelId),
        },
        select: {
          subLevels: {
            select: {
              gameModes: true,
              id: true,
              name: true,
              fragmentToShow: true,
              color: true,
            },
          },
        },
      })
      if (!subLevels) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Level has no sublevels' })
      }

      return subLevels.subLevels
    }),

  getAllRemainingSubLevelsOfLevel: protectedProcedure
    .input(z.object({ levelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { levelId } = input
      const subLevels = await ctx.prisma.level.findFirst({
        where: {
          id: parseInt(levelId),
        },
        select: {
          subLevels: true,
        },
      })
      if (!subLevels) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Level has no sublevels' })
      }

      const allSubLevels = await ctx.prisma.subLevel.findMany()
      const remainingSubLevels = allSubLevels.filter((subLevel) => {
        return !subLevels.subLevels.some((level) => level.id === subLevel.id)
      })
      return remainingSubLevels
    }),

  getLevelById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.level.findFirst({
        where: {
          id: parseInt(id),
        },
      })
    }),

  setSubLevelsToLevel: protectedProcedure
    .input(
      z.object({
        levelId: z.string(),
        sublevels: z.array(z.number().int()),
        color: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { levelId, sublevels, color } = input
      const level = await ctx.prisma.level.findFirst({
        where: {
          id: parseInt(levelId),
        },
        select: {
          subLevels: true,
        },
      })
      if (!level) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Level does not exist' })
      }

      const newSubLevels = await ctx.prisma.subLevel.findMany({
        where: {
          id: {
            in: sublevels,
          },
        },
      })

      if (newSubLevels.length !== sublevels.length) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Not all sublevels were found' })
      }

      if (color) {
        await ctx.prisma.subLevel.updateMany({
          where: {
            id: {
              in: sublevels,
            },
          },
          data: {
            color: input.color,
          },
        })
      }

      return await ctx.prisma.level.update({
        where: {
          id: parseInt(levelId),
        },
        data: {
          subLevels: {
            set: sublevels.map((id) => ({ id })),
          },
        },
      })
    }),

  updateLevel: protectedProcedure.input(LevelSchema).mutation(async ({ ctx, input }) => {
    const { id } = input
    return await ctx.prisma.level.update({
      where: { id },
      data: input,
    })
  }),

  deleteLevel: protectedProcedure
    .input(SubLevelSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.level.delete({
        where: { id },
      })
    }),

  getPointsPerLevel: protectedProcedure.query(async ({ ctx }) => {
    const levels = await ctx.prisma.level.findMany({
      select: {
        id: true,
        name: true,
        points: true,
        instrument: true,
        color: true,
        subLevels: {
          select: {
            id: true,
          },
        },
      },
    })

    const scoreResults = await ctx.prisma.points.findMany({
      where: {
        id_User: ctx.session.user?.id,
      },
      select: {
        id_sublevel: true,
        points: true,
      },
    })

    const subLevelPointsMap = scoreResults.reduce(
      (acc, scoreResult) => {
        if (!acc[scoreResult.id_sublevel]) {
          acc[scoreResult.id_sublevel] = 0
        }
        //@ts-ignore not possibly undefined
        acc[scoreResult.id_sublevel] += scoreResult.points
        return acc
      },
      {} as Record<number, number>,
    )

    // Now, map the subLevel scores to levels
    const levelScores = levels.map((level) => {
      const totalLevelPoints = level.subLevels.reduce((total, subLevel) => {
        return total + (subLevelPointsMap[subLevel.id] || 0)
      }, 0)
      return {
        ...level,
        score: totalLevelPoints,
      }
    })

    return levelScores
  }),
})
