import {
  QuestionAnswerOptionalDefaultsSchema,
  QuestionOptionalDefaultsSchema,
  QuestionSchema,
} from 'prisma/generated/zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const questionsRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(QuestionOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.question.create({
        data: input,
      })
    }),

  createQuestionAnswer: protectedProcedure
    .input(QuestionAnswerOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.questionAnswer.create({
        data: input,
      })
    }),

  getAllQuestions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany()
  }),

  updateQuestion: protectedProcedure.input(QuestionSchema).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.question.update({
      where: { id: input.id },
      data: input,
    })
  }),

  deleteQuestion: protectedProcedure
    .input(QuestionSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.question.delete({
        where: { id: input.id },
      })
    }),
})


