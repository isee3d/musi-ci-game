import { NoteSchema } from "prisma/generated/zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// TODO Make procedures protected


export const fragmentNoteRouter = createTRPCRouter({
  createNote: publicProcedure.input(NoteSchema).mutation(async ({ ctx, input }) => {
    const { note, velocity, time, dur } = input;

    return await ctx.prisma.note.create({
      data: { note, time, velocity, dur },
    });
  }),

  getAllNotes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),

  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
