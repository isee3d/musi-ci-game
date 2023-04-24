import { TRPCError } from "@trpc/server";
import { LevelOptionalDefaultsSchema, LevelSchema } from "prisma/generated/zod";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const levelRouter = createTRPCRouter({
    createLevel: publicProcedure
        .input(LevelOptionalDefaultsSchema.extend({ fragments: z.array(z.number().int()) }))
        .mutation(async ({ ctx, input }) => {
            const { fragments, ...newInput } = input;

            return await ctx.prisma.level.create({
                data: {
                    ...newInput,
                    fragments: {
                        connect: fragments.map((id) => ({ id })),
                    },
                }
            });
        }),

    getAllLevels: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.level.findMany();
    }),

    getGameModesOflevel: publicProcedure.input(z.object({ levelName: z.string() })).query(async ({ ctx, input }) => {
        const { levelName } = input;
        const gameModes = await ctx.prisma.level.findFirst({
            where: {
                name: levelName,
            },
            select: {
                gameModes: true,
            },
        });
        if (!gameModes) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Level has no game modes' });
        }

        return gameModes.gameModes;
    }),

    getFragmentsOflevel: publicProcedure.input(z.object({ levelName: z.string() })).query(async ({ ctx, input }) => {
        const { levelName } = input;
        const fragments = await ctx.prisma.level.findFirst({
            where: {
                name: levelName,
            },
            select: {
                fragmentToShow: true,
                fragments: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        notes: true,
                    },
                },
            },
        });
        if (!fragments) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Level has no fragments' });
        }

        return fragments;
    }),

    updateLevel: publicProcedure.input(LevelSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.level.update({
            where: { id },
            data: input,
        });
    }),

    deleteLevel: publicProcedure.input(LevelSchema.pick({ id: true })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        return await ctx.prisma.level.delete({
            where: { id },
        });
    }),
});
