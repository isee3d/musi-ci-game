import { TRPCError } from "@trpc/server";
import { UserSchema } from "prisma/generated/zod";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAllUsersWithoutTeam: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      where: {
        team: null,
      },
    })
  }),

  getAllUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        team: true,
      },
    })
  }),

  getGamesOfUser: protectedProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      const userTeamGames = await ctx.prisma.user.findUnique({
        where: { id },
        select: {
          team: {
            select: {
              game: true,
            },
          },
        },
      })
      if (!userTeamGames || !userTeamGames.team) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User has no team' })
      }
      return userTeamGames.team.game
    }),

  setUserToTeam: protectedProcedure
    .input(z.object({ userId: z.string(), teamId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, teamId } = input
      return await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      })
    }),

  setParticipantIdToUser: protectedProcedure
    .input(z.object({ userId: z.string(), participantId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, participantId } = input
      return await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          participantId: participantId,
        },
      })
    }),

  deleteUser: protectedProcedure
    .input(UserSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.user.delete({
        where: { id },
      })
    }),

  updateUserRole: protectedProcedure
    .input(z.object({ id: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, role } = input
      return await ctx.prisma.user.update({
        where: { id },
        data: {
          role: role,
        },
      })
    }),
})
