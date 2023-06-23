import { RoleSchema, RoleOptionalDefaultsSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const roleRouter = createTRPCRouter({
  createRole: protectedProcedure
    .input(RoleOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.role.create({
        data: input,
      })
    }),

  getAllRoles: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.role.findMany()
  }),

  updateRole: protectedProcedure.input(RoleSchema).mutation(async ({ ctx, input }) => {
    const { id } = input
    return await ctx.prisma.role.update({
      where: { id },
      data: input,
    })
  }),

  deleteRole: protectedProcedure
    .input(RoleSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.prisma.role.delete({
        where: { id },
      })
    }),
})
