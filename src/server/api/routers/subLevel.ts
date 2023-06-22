import { TRPCError } from '@trpc/server'
import { SubLevelOptionalDefaultsSchema, SubLevelSchema } from 'prisma/generated/zod'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const subLevelRouter = createTRPCRouter({
  createSubLevel: publicProcedure
    .input(
      SubLevelOptionalDefaultsSchema.extend({
        fragments: z.array(z.number().int()),
        gameModes: z.array(z.number().int()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { fragments, gameModes, ...newInput } = input

      return await ctx.prisma.subLevel.create({
        data: {
          ...newInput,
          fragments: {
            connect: fragments.map((id) => ({ id })),
          },
          gameModes: {
            connect: gameModes.map((id) => ({ id })),
          },
        },
      })
    }),

  getAllSubLevels: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subLevel.findMany()
  }),

  getSublevelById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      const subLevel = await ctx.prisma.subLevel.findFirst({
        where: {
          id: parseInt(id),
        },
      })
      if (!subLevel) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'SubLevel not found' })
      }

      return subLevel
    }),

  getGameModesOfSublevel: publicProcedure
    .input(z.object({ subLevelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { subLevelId } = input
      const gameModes = await ctx.prisma.subLevel.findFirst({
        where: {
          id: parseInt(subLevelId),
        },
        select: {
          gameModes: true,
        },
      })
      if (!gameModes) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Level has no game modes' })
      }

      return gameModes.gameModes
    }),

  getFragmentsOfSublevel: publicProcedure
    .input(z.object({ subLevelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { subLevelId } = input
      const fragments = await ctx.prisma.subLevel.findFirst({
        where: {
          id: parseInt(subLevelId),
        },
        select: {
          playTime: true,
          fragmentToShow: true,
          fragments: {
            select: {
              id: true,
              name: true,
              description: true,
              notes: true,
            },
          },
        },
      })
      if (!fragments) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'SubLevel has no fragments' })
      }

      return fragments
    }),

  updateSubLevel: publicProcedure.input(SubLevelSchema).mutation(async ({ ctx, input }) => {
    const { id } = input
    return await ctx.prisma.subLevel.update({
      where: { id },
      data: input,
    })
  }),

  deleteSubLevel: publicProcedure
    .input(SubLevelSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.subLevel.delete({
        where: { id },
      })
    }),
})
