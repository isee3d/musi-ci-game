import { GameModeOptionalDefaultsSchema, GameModeSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const gameModeRouter = createTRPCRouter({
  createGameMode: protectedProcedure
    .input(GameModeOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.gameMode.create({
        data: input,
      })
    }),

  getAllGameModes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.gameMode.findMany()
  }),

  getGameMode: protectedProcedure
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

  deleteGameMode: protectedProcedure
    .input(GameModeSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.gameMode.delete({
        where: { id },
      })
    }),
})
