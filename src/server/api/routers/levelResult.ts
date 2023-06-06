import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const levelResultRouter = createTRPCRouter({
    saveLevelResult: publicProcedure
        .input()
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.levelResult.create({
                data: input,
            });
        }),

    // saveLevelResult: publicProcedure
    //     .input(z.object({ text: z.string() }))
    //     .query(({ input }) => {
    //         return {
    //             greeting: `Hello ${input.text}`,
    //         };
    //     }),
});
