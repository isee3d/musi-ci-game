import { NoteSchema } from "prisma/generated/zod";


import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// TODO Make procedures protected


export const fragmentNoteRouter = createTRPCRouter({
  createNote: publicProcedure.input(NoteSchema.omit({ id: true }))
  .mutation(async ({ ctx, input }) => {
    const { name, speed, time, duration, id_Fragment } = input;

    return await ctx.prisma.note.create({
      data: { name, time, speed, duration, id_Fragment },
    });
  }),

  deleteNote: publicProcedure.input(NoteSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
    const { id } = input;
    return await ctx.prisma.note.delete({
      where: { id },
    });
  }),

  updateNote: publicProcedure.input(NoteSchema).mutation(async ({ ctx, input }) => {
    const { id, name, speed, time, duration } = input;
    return await ctx.prisma.note.update({
      where: { id },
      data: { name, speed, time, duration },
    });
  }),

  getAllNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.note.findMany();
  }),
});
