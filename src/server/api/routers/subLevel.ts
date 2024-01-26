import { TRPCError } from '@trpc/server'
import { SubLevelOptionalDefaultsSchema, SubLevelSchema } from 'prisma/generated/zod'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const subLevelRouter = createTRPCRouter({
  createSubLevel: protectedProcedure
    .input(
      SubLevelOptionalDefaultsSchema.extend({
        fragments: z.array(z.number().int()),
        gameModes: z.array(z.number().int()),
        fragmentGroups: z.array(z.number().int()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fragments, gameModes, fragmentGroups, ...newInput } = input

      const existingSublevel = await ctx.prisma.subLevel.findFirst({
        where: {
          name: newInput.name,
        },
      })

      if (existingSublevel) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Sublevel already exists' })
      }

      return await ctx.prisma.subLevel.create({
        data: {
          ...newInput,
          fragments: {
            connect: fragments.map((id) => ({ id })),
          },
          fragmentGroups: {
            connect: fragmentGroups.map((id) => ({ id })),
          },
          gameModes: {
            connect: gameModes.map((id) => ({ id })),
          },
        },
      })
    }),

  getAllSubLevels: protectedProcedure.query(({ ctx }) => {
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
    .input(z.object({ sublevelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { sublevelId } = input
      const gameModes = await ctx.prisma.subLevel.findFirst({
        where: {
          id: parseInt(sublevelId),
        },
        select: {
          gameModes: true,
        },
      })
      if (!gameModes) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Sublevel has no game modes' })
      }

      return gameModes.gameModes
    }),

  getFragmentsOfSublevel: publicProcedure
    .input(z.object({ sublevelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { sublevelId: subLevelId } = input
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
              useAlways: true,
              notes: true,
              isActive: true,
            },
          },
        },
      })
      if (!fragments) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'SubLevel has no fragments' })
      }

      return fragments
    }),

  getFragmentGroupsOfSublevel: publicProcedure
    .input(z.object({ sublevelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { sublevelId: subLevelId } = input
      const fragmentGroups = await ctx.prisma.subLevel.findFirst({
        where: {
          id: parseInt(subLevelId),
        },
        select: {
          fragmentGroups: {
            select: {
              id: true,
              name: true,
              description: true,
              fragments: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  useAlways: true,
                  notes: true,
                },
              },
            },
          },
        },
      })

      return fragmentGroups
    }),

  updateSubLevel: protectedProcedure
    .input(
      SubLevelSchema.extend({
        fragments: z.array(z.number().int()),
        gameModes: z.array(z.number().int()),
        fragmentGroups: z.array(z.number().int()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, gameModes, fragments, fragmentGroups } = input

      const duplicateSublevel = await ctx.prisma.subLevel.findFirst({
        where: {
          name: input.name,
          id: {
            not: id,
          },
        },
      })

      if (duplicateSublevel) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Sublevel bestaat al' })
      }

      return await ctx.prisma.subLevel.update({
        where: { id },
        data: {
          ...input,
          fragments: {
            set: fragments.map((id) => ({ id })),
          },
          gameModes: {
            set: gameModes.map((id) => ({ id })),
          },
          fragmentGroups: {
            set: fragmentGroups?.map((id) => ({ id })),
          },
        },
      })
    }),

  deleteSubLevel: protectedProcedure
    .input(SubLevelSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.subLevel.delete({
        where: { id },
      })
    }),
})
