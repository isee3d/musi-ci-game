import { LevelResultOptionalDefaultsWithRelationsSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const levelResultRouter = createTRPCRouter({
    saveLevelResult: publicProcedure
        .input(LevelResultOptionalDefaultsWithRelationsSchema)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.levelResult.create({
                data: input,
                // TODO: split all data from input to create correct create object
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
