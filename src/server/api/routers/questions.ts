import {
  QuestionAnswerOptionalDefaultsSchema,
  QuestionOptionalDefaultsSchema,
  QuestionSchema,
} from 'prisma/generated/zod'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const questionsRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(QuestionOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      const existingQuestion = await ctx.prisma.question.findFirst({
        where: {
          question: input.question,
        },
      })

      if (existingQuestion) {
        throw new Error('Question already exists')
      }

      return await ctx.prisma.question.create({
        data: input,
      })
    }),

  // This doesn't work in SQlite, but might in mySQL for planetscale

  // createQuestionAnswer: protectedProcedure
  //   .input(z.array(QuestionAnswerOptionalDefaultsSchema))
  //   .mutation(async ({ ctx, input }) => {
  //      return await ctx.prisma.questionAnswer.createMany({
  //        data: input,
  //      })
  //   }),

  createQuestionAnswers: protectedProcedure
    .input(z.array(QuestionAnswerOptionalDefaultsSchema.omit({ id: true, answeredDate: true})))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.questionAnswer.createMany({
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
