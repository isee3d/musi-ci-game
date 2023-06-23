import { TRPCError } from "@trpc/server";
import { GameSchema, GameModeOptionalDefaultsSchema } from "prisma/generated/zod";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  createGame: protectedProcedure
    .input(GameModeOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.game.create({
        data: input,
      })
    }),

  getAllGames: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany()
  }),

  updateGame: protectedProcedure.input(GameSchema).mutation(async ({ ctx, input }) => {
    const { id } = input
    return await ctx.prisma.game.update({
      where: { id },
      data: input,
    })
  }),

  deleteGame: protectedProcedure
    .input(GameSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.game.delete({
        where: { id },
      })
    }),

  getLevelsOfGame: protectedProcedure
    .input(z.object({ gameId: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const { gameId } = input
      const gameLevels = await ctx.prisma.game.findUnique({
        where: { id: gameId },
        select: {
          levels: true,
        },
      })
      if (!gameLevels) throw new TRPCError({ code: 'NOT_FOUND', message: 'Game has no levels' })
      return gameLevels.levels
    }),
})
