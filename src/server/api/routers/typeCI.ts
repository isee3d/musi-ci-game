import { TypeCISchema, TypeCIOptionalDefaultsSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const typeCIRouter = createTRPCRouter({
    createTypeCI: publicProcedure
        .input(TypeCIOptionalDefaultsSchema)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.typeCI.create({
                data: input,
            });
        }),

    getAllTypeCI: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.typeCI.findMany();
    }),

    updateTypeCI: publicProcedure.input(TypeCISchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.typeCI.update({
            where: { id },
            data: input,
        });
    }),

    deleteTypeCI: publicProcedure.input(TypeCISchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.typeCI.delete({
            where: { id },
        });
    }),
});
