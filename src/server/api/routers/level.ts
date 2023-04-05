import { LevelSchema } from "prisma/generated/zod";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const levelRouter = createTRPCRouter({
    createLevel: publicProcedure
        .input(LevelSchema.omit({ id: true }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.level.create({
                data: input,
            });
        }),

    getAllLevels: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.level.findMany();
    }),

    updateLevel: publicProcedure.input(LevelSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.level.update({
            where: { id },
            data: input,
        });
    }),

    deleteLevel: publicProcedure.input(LevelSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.level.delete({
            where: { id },
        });
    }),
});
