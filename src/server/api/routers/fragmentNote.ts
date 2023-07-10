import {
  FragmentSchema,
  NoteSchema,
  NoteOptionalDefaultsSchema,
  FragmentOptionalDefaultsSchema,
  FragmentGroupOptionalDefaultsSchema,
} from 'prisma/generated/zod'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

// TODO Make procedures protected

const Note = z.object({
  name: z.string(),
  time: z.number(),
  duration: z.number(),
  speed: z.number(),
})

export const fragmentNoteRouter = createTRPCRouter({
  updateNote: protectedProcedure.input(NoteSchema).mutation(async ({ ctx, input }) => {
    const { id, name, speed, time, duration } = input
    return await ctx.prisma.note.update({
      where: { id },
      data: { name, speed, time, duration },
    })
  }),

  createFragment: protectedProcedure
    .input(FragmentOptionalDefaultsSchema.extend({ notes: z.array(Note) }))
    .mutation(async ({ ctx, input }) => {
      const { notes, ...newInput } = input

      return await ctx.prisma.fragment.create({
        data: {
          ...newInput,
          notes: {
            create: notes,
          },
        },
      })
    }),

  getAllFragments: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.fragment.findMany()
  }),

  deleteFragment: protectedProcedure
    .input(FragmentSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.fragment.delete({
        where: { id },
      })
    }),

  updateFragment: protectedProcedure
    .input(FragmentOptionalDefaultsSchema.extend({ notes: z.array(Note) }))
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, notes } = input
      return await ctx.prisma.fragment.update({
        where: { id },
        data: {
          name,
          description,
          notes: {
            deleteMany: {},
            create: notes,
          },
        },
      })
    }),

  getNotesOfFragment: protectedProcedure
    .input(FragmentSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.note.findMany({
        where: { id_Fragment: id },
      })
    }),

  createFragmentGroup: protectedProcedure
    .input(
      FragmentGroupOptionalDefaultsSchema.extend({
        fragments: z.array(z.number()),
        sublevel: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { fragments, sublevel, ...newInput } = input
      return await ctx.prisma.fragmentGroup.create({
        data: {
          ...newInput,
          subLevels: {
            connect: sublevel?.map((id) => ({ id })),
          },
          fragments: {
            connect: fragments.map((id) => ({ id })),
          },
        },
      })
    }),

  getAllFragmentGroups: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.fragmentGroup.findMany()
  }),

  getFragmentsOfFragmentGroup: protectedProcedure
    .input(FragmentSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      const fragments = await ctx.prisma.fragmentGroup.findFirst({
        where: { id },
        select: {
          fragments: {
            select: {
              id: true,
              name: true,
              description: true,
              useAlways: true,
            },
          },
        },
      })

      return fragments
    }),

  deleteFragmentGroup: protectedProcedure
    .input(FragmentSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.fragmentGroup.delete({
        where: { id },
      })
    }),

  updateFragmentGroup: protectedProcedure
    .input(
      FragmentGroupOptionalDefaultsSchema.extend({
        fragments: z.array(z.number().int()),
        sublevel: z.array(z.number().int()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, fragments, sublevel } = input
      return await ctx.prisma.fragmentGroup.update({
        where: { id },
        data: {
          name,
          description,
          subLevels: {
            disconnect: {},
            connect: sublevel?.map((id) => ({ id })),
          },
          fragments: {
            disconnect: {},
            connect: fragments.map((id) => ({ id })),
          },
        },
      })
    }),
})
