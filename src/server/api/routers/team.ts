import { TeamSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
    createTeam: publicProcedure
        .input(TeamSchema.omit({ id: true }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.team.create({
                data: input,
            });
        }),

    getAllTeams: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.team.findMany();
    }),

    updateTeam: publicProcedure.input(TeamSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.team.update({
            where: { id },
            data: input,
        });
    }),

    deleteTeam: publicProcedure.input(TeamSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.team.delete({
            where: { id },
        });
    }),
});
