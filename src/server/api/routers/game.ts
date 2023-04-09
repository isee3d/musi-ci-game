import { TRPCError } from "@trpc/server";
import { GameSchema, GameModeOptionalDefaultsSchema } from "prisma/generated/zod";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
    createGame: publicProcedure
        .input(GameModeOptionalDefaultsSchema)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.game.create({
                data: input,
            });
        }),

    getAllGames: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.game.findMany();
    }),

    updateGame: publicProcedure.input(GameSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.game.update({
            where: { id },
            data: input,
        });
    }),

    deleteGame: publicProcedure.input(GameSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.game.delete({
            where: { id },
        });
    }),

    getLevelsOfGame: publicProcedure.input(z.object({gameId: z.number().int()})).query(async ({ ctx, input }) => {
        const { gameId } = input;
        const gameLevels = await ctx.prisma.game.findUnique({
            where: { id: gameId },
            select: {
                levels: true,
            },
        });
        if (!gameLevels) throw new TRPCError({ code: 'NOT_FOUND', message: 'Game has no levels' });
        return gameLevels.levels;
    }),
});
