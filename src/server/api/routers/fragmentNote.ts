import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// TODO:

// 1. Add route for create note
// 1. Add route for create fragment?


export const fragmentNoteRouter = createTRPCRouter({
    createNote: publicProcedure
    .input(
      z.object({
         id: z.string().optional(),
         note: z.string(),
         velocity: z.number(),
         time: z.string(),
         dur: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { note, velocity, time, dur } = input;

      const createdNote = await ctx.prisma.note.create({
        data: {
          note,
          time,
          velocity,
          dur,
        },
      });

      return createdNote;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
});
