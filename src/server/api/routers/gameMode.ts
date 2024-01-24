import { TRPCError } from '@trpc/server'
import { GameModeOptionalDefaultsSchema, GameModeSchema } from 'prisma/generated/zod'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const gameModeRouter = createTRPCRouter({
  createGameMode: protectedProcedure
    .input(GameModeOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      const existingGameMode = await ctx.prisma.gameMode.findUnique({ where: { name: input.name } })
      if(existingGameMode) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Game mode bestaat al',
        })
      }
      return await ctx.prisma.gameMode.create({
        data: input,
      })
    }),

  getAllGameModes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.gameMode.findMany()
  }),

  getGameMode: publicProcedure
    .input(GameModeSchema.pick({ name: true }))
    .query(async ({ ctx, input }) => {
      const { name } = input
      return await ctx.prisma.gameMode.findUnique({
        where: { name },
      })
    }),

  updateGameMode: protectedProcedure.input(GameModeSchema).mutation(async ({ ctx, input }) => {
    const { id } = input
    return await ctx.prisma.gameMode.update({
      where: { id },
      data: input,
    })
  }),

  updateGameModeTimings: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        one: z.number().min(100),
        two: z.number().min(100),
        three: z.number().min(100),
        go: z.number().min(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.gameMode.update({
        where: { id },
        data: { one: input.one, two: input.two, three: input.three, go: input.go },
      })
    }),

  deleteGameMode: protectedProcedure
    .input(GameModeSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.gameMode.delete({
        where: { id },
      })
    }),
})
