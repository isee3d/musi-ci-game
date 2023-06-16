import { LevelOptionalDefaultsSchema, LevelSchema } from './../../../../prisma/generated/zod/index';
import { TRPCError } from "@trpc/server";
import { SubLevelSchema } from "prisma/generated/zod";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const levelRouter = createTRPCRouter({
    createLevel: publicProcedure
        .input(LevelOptionalDefaultsSchema.extend({ sublevels: z.array(z.number().int()) }))
        .mutation(async ({ ctx, input }) => {
            const { sublevels, ...newInput } = input;

            return await ctx.prisma.level.create({
                data: {
                    ...newInput,
                    subLevels: {
                        connect: sublevels.map((id) => ({ id })),
                    },
                }
            });
        }),

    getAllLevels: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.level.findMany();
    }),

    getSubLevelsOfLevel: publicProcedure.input(z.object({ levelId: z.string() })).query(async ({ ctx, input }) => {
        const { levelId } = input;
        const subLevels = await ctx.prisma.level.findFirst({
            where: {
                id: parseInt(levelId),
            },
            select: {
                subLevels: true,
            },
        });
        if (!subLevels) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Level has no sublevels' });
        }

        return subLevels.subLevels;
    }),

    setSubLevelsToLevel: publicProcedure
        .input(z.object({ levelId: z.string(), sublevels: z.array(z.number().int()) }))
        .mutation(async ({ ctx, input }) => {
            const { levelId, sublevels } = input;
            const level = await ctx.prisma.level.findFirst({
                where: {
                    id: parseInt(levelId),
                },
                select: {
                    subLevels: true,
                },
            });
            if (!level) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Level does not exist' });
            }

            const newSubLevels = await ctx.prisma.subLevel.findMany({
                where: {
                    id: {
                        in: sublevels,
                    },
                },
            });
            if (newSubLevels.length !== sublevels.length) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Not all sublevels were found' });
            }

            return await ctx.prisma.level.update({
                where: {
                    id: parseInt(levelId),
                },
                data: {
                    subLevels: {
                        set: newSubLevels,
                    },
                },
            });
        }),


    updateLevel: publicProcedure.input(LevelSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.level.update({
            where: { id },
            data: input,
        });
    }),

    deleteLevel: publicProcedure.input(SubLevelSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.level.delete({
            where: { id },
        });
    }),
});
