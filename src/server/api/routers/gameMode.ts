import { GameModeSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const gameModeRouter = createTRPCRouter({
    createGameMode: publicProcedure
        .input(GameModeSchema.omit({ id: true }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.gameMode.create({
                data: input,
            });
        }),

    getAllGameModes: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.gameMode.findMany();
    }),

    updateGameMode: publicProcedure.input(GameModeSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.gameMode.update({
            where: { id },
            data: input,
        });
    }),

    deleteGameMode: publicProcedure.input(GameModeSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.gameMode.delete({
            where: { id },
        });
    }),
});
