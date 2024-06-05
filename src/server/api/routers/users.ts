import { TRPCError } from '@trpc/server'
import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import bcrypt from 'bcrypt'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import { userFormSchema } from 'types/FormSchema'

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

  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.user.findUnique({
        where: { id },
      })
    }),

  setUserTutorialPreference: protectedProcedure
    .input(z.object({ id: z.string(), preferSkipTutorial: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, preferSkipTutorial } = input
      return await ctx.prisma.user.update({
        where: { id },
        data: {
          preferSkipTutorial: preferSkipTutorial,
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

  updateUserIsAllowedToPlay: protectedProcedure
    .input(z.object({ id: z.string(), isAllowedToPlay: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, isAllowedToPlay } = input
      return await ctx.prisma.user.update({
        where: { id },
        data: {
          isAllowedToPlay: isAllowedToPlay,
        },
      })
    }),

  createUserActivity: protectedProcedure
    .input(z.object({ userId: z.string(), activity: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, activity } = input
      return await ctx.prisma.activity.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          activity: activity,
        },
      })
    }),

  createUserByCredentials: protectedProcedure
    .input(userFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, participantId, password, isAllowedToPlay } = input

      if (!participantId) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Deelnemer nummer is verplicht' })
      }

      if (participantId) {
        const participantIdExists = await ctx.prisma.user.findUnique({
          where: {
            participantId: participantId,
          },
        })

        if (participantIdExists) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message:
              'Er is is iets misgegaan, Deelnemer nummer is al in gebruik, kies een uniek nummer',
          })
        }
      }

      if (password === undefined) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'wachtwoord is verplicht' })
      }

      if (password.length < 6) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Wachtwoord moet minstens 6 tekens hebben',
        })
      }

      return await ctx.prisma.user.create({
        data: {
          name: name,
          participantId: participantId,
          isAllowedToPlay: isAllowedToPlay,
          hashedPassword: await bcrypt.hash(password, 10),
          id_Team: 1,
        },
      })
    }),

  updateUserData: protectedProcedure.input(userFormSchema).mutation(async ({ ctx, input }) => {
    const { userId, participantId, password, isAllowedToPlay, role, name } = input

    if (!userId) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Id voor speler verplicht' })
    }

    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!existingUser) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Speler bestaat niet' })
    }

    if (password && password.length < 6) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Wachtwoord moet minstens 6 tekens hebben',
      })
    }

    if (participantId) {
      const participantIdExists = await ctx.prisma.user.findUnique({
        where: {
          participantId: participantId,
        },
      })

      if (participantIdExists && participantIdExists.id !== userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Deelnemer nummer is al in gebruik, kies een uniek nummer',
        })
      }
    }

    let updateData = {
      name: name,
      participantId: participantId,
      isAllowedToPlay: isAllowedToPlay,
      role: role,
    }

    if (password) {
      // @ts-ignore
      updateData.hashedPassword = await bcrypt.hash(password, 10)
    }

    return await ctx.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    })
  }),

  deleteAllUserPoints: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.points.deleteMany({
      where: {
        id_User: ctx.session.user.id,
      },
    })

    return ctx.session.user
  }),
})
