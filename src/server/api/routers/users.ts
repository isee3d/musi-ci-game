import { UserSchema } from "prisma/generated/zod";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
    getAllUsersWithoutTeam: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.user.findMany({
                where: {
                    team: null,
                },
            });
        }),

    getAllUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            include: {
                team: true,
            },
        });
    }),

    setUserToTeam: publicProcedure.input(z.object({ userId: z.string(), teamId: z.number().int() }))
        .mutation(async ({ ctx, input }) => {
            const { userId, teamId } = input;
            return await ctx.prisma.user.update({
                where: { id: userId },
                data: {
                    team: {
                        connect: {
                            id: teamId,
                        },
                    },
                },
            });
        }),


    // updateKliniek: publicProcedure.input(UserSchema).mutation(async ({ ctx, input }) => {
    //     const { id } = input;
    //     return await ctx.prisma.kliniek.update({
    //         where: { id },
    //         data: input,
    //     });
    // }),

    deleteUser: publicProcedure.input(UserSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.user.delete({
            where: { id },
        });
    }),
});
