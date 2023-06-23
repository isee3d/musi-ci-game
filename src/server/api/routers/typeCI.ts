import { TypeCISchema, TypeCIOptionalDefaultsSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const typeCIRouter = createTRPCRouter({
  createTypeCI: protectedProcedure
    .input(TypeCIOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.typeCI.create({
        data: input,
      })
    }),

  getAllTypeCI: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.typeCI.findMany()
  }),

  updateTypeCI: protectedProcedure.input(TypeCISchema).mutation(async ({ ctx, input }) => {
    const { id } = input
    return await ctx.prisma.typeCI.update({
      where: { id },
      data: input,
    })
  }),

  deleteTypeCI: protectedProcedure
    .input(TypeCISchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.typeCI.delete({
        where: { id },
      })
    }),
})
