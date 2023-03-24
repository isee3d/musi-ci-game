import { NoteSchema } from "prisma/generated/zod";


import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// TODO Make procedures protected


export const fragmentNoteRouter = createTRPCRouter({
  createNote: publicProcedure.input(NoteSchema.omit({ id: true })).mutation(async ({ ctx, input }) => {
    const { note, velocity, time, dur } = input;

    return await ctx.prisma.note.create({
      data: { note, time, velocity, dur },
    });
  }),

  deleteNote: publicProcedure.input(NoteSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
    const { id } = input;
    return await ctx.prisma.note.delete({
      where: { id },
    });
  }),

  updateNote: publicProcedure.input(NoteSchema).mutation(async ({ ctx, input }) => {
    const { id, note, velocity, time, dur } = input;
    return await ctx.prisma.note.update({
      where: { id },
      data: { note, velocity, time, dur },
    });
  }),

  getAllNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.note.findMany();
  }),
});
