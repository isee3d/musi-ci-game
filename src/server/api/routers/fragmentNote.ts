import {
  FragmentSchema,
  NoteSchema,
  NoteOptionalDefaultsSchema,
  FragmentOptionalDefaultsSchema,
  FragmentgroupOptionalDefaultsSchema,
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
      FragmentgroupOptionalDefaultsSchema.extend({
        fragments: z.array(z.number()),
        sublevel: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { fragments, sublevel, ...newInput } = input
      return await ctx.prisma.fragmentgroup.create({
        data: {
          ...newInput,
          subLevels: {
            connect: sublevel.map((id) => ({ id })),
          },
          fragments: {
            connect: fragments.map((id) => ({ id })),
          },
        },
      })
    }),

  getAllFragmentGroups: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.fragmentgroup.findMany()
  }),

  deleteFragmentGroup: protectedProcedure
    .input(FragmentSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.fragmentgroup.delete({
        where: { id },
      })
    }),

  updateFragmentGroup: protectedProcedure
    .input(
      FragmentgroupOptionalDefaultsSchema.extend({
        fragments: z.array(z.number().int()),
        sublevel: z.array(z.number().int()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, fragments, sublevel } = input
      return await ctx.prisma.fragmentgroup.update({
        where: { id },
        data: {
          name,
          description,
          subLevels: {
            disconnect: {},
            connect: sublevel.map((id) => ({ id })),
          },
          fragments: {
            disconnect: {},
            connect: fragments.map((id) => ({ id })),
          },
        },
      })
    }),
})
