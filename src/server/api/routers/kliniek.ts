import { KliniekSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const kliniekRouter = createTRPCRouter({
    createKliniek: publicProcedure
        .input(KliniekSchema.omit({ id: true }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.kliniek.create({
                data: input,
            });
        }),

    getAllKlinieks: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.kliniek.findMany();
    }),

    updateKliniek: publicProcedure.input(KliniekSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.kliniek.update({
            where: { id },
            data: input,
        });
    }),

    deleteKliniek: publicProcedure.input(KliniekSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.kliniek.delete({
            where: { id },
        });
    }),
});
