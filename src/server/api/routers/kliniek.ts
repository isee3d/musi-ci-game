import { KliniekSchema, KliniekOptionalDefaultsSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const kliniekRouter = createTRPCRouter({
  createKliniek: protectedProcedure
    .input(KliniekOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.kliniek.create({
        data: input,
      })
    }),

  getAllKlinieks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.kliniek.findMany()
  }),

  updateKliniek: protectedProcedure.input(KliniekSchema).mutation(async ({ ctx, input }) => {
    const { id } = input
    return await ctx.prisma.kliniek.update({
      where: { id },
      data: input,
    })
  }),

  deleteKliniek: protectedProcedure
    .input(KliniekSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.kliniek.delete({
        where: { id },
      })
    }),
})
