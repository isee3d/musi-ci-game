import { FragmentSchema, NoteSchema, NoteOptionalDefaultsSchema, FragmentOptionalDefaultsSchema } from "prisma/generated/zod";
import { z } from "zod";


import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// TODO Make procedures protected

const Note = z.object({
  name: z.string(),
  time: z.number(),
  duration: z.number(),
  speed: z.number(),
});


export const fragmentNoteRouter = createTRPCRouter({
  updateNote: publicProcedure.input(NoteSchema).mutation(async ({ ctx, input }) => {
    const { id, name, speed, time, duration } = input;
    return await ctx.prisma.note.update({
      where: { id },
      data: { name, speed, time, duration },
    });
  }),

  createFragment: publicProcedure.input(FragmentOptionalDefaultsSchema.extend({ notes: z.array(Note) }))
    .mutation(async ({ ctx, input }) => {
      const { notes, ...newInput } = input;

      return await ctx.prisma.fragment.create({
        data: {
          ...newInput,
          notes: {
            create: notes
          },
        }
      });
    }),

  getAllFragments: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.fragment.findMany();
  }),

  deleteFragment: publicProcedure.input(FragmentSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
    const { id } = input;
    return await ctx.prisma.fragment.delete({
      where: { id },
    });
  }),

  updateFragment: publicProcedure
    .input(FragmentOptionalDefaultsSchema.extend({ notes: z.array(Note) }))
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, notes } = input;
      return await ctx.prisma.fragment.update({
        where: { id },
        data: {
          name,
          description,
          notes: {
            deleteMany: {},
            create: notes,
          }
        },
      });
    }),

    getNotesOfFragment: publicProcedure.input(FragmentSchema.pick({ id: true })).query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.note.findMany({
        where: { id_Fragment: id }
      });
    }
    ),
});
