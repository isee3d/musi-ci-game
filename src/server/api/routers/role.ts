import { RoleSchema, RoleOptionalDefaultsSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const roleRouter = createTRPCRouter({
    createRole: publicProcedure
        .input(RoleOptionalDefaultsSchema)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.role.create({
                data: input,
            });
        }),

    getAllRoles: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.role.findMany();
    }),

    updateRole: publicProcedure.input(RoleSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.role.update({
            where: { id },
            data: input,
        });
    }),

    deleteRole: publicProcedure.input(RoleSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.role.delete({
            where: { id },
        });
    }),
});
