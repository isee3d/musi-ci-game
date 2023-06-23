import { LevelResultOptionalDefaultsWithRelationsSchema } from "prisma/generated/zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const levelResultRouter = createTRPCRouter({
  saveLevelResult: protectedProcedure
    .input(LevelResultOptionalDefaultsWithRelationsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.levelResult.create({
        data: {
          id_User: input.id_User,
          id_level: input.id_level,
          id_subLevel: input.id_subLevel,
          id_gameMode: input.id_gameMode,
          startTime: input.startTime,
          endTime: input.endTime,
          score: input.score,
          Scenes: {
            create: input.Scenes.map((scene) => ({
              chosenFragmentLatency: scene.chosenFragmentLatency ?? 0,
              id_chosenFragment: scene.id_chosenFragment ?? undefined,
              id_playedFragment: scene.id_playedFragment ?? undefined,
              answeredCorrectly: scene.answeredCorrectly ?? false,
              sceneFragments: {
                create: scene.sceneFragments.map((fragment) => ({
                  id_fragment: fragment.id_fragment,
                  fragmentIndex: fragment.fragmentIndex,
                  groundTone: fragment.groundTone,
                })),
              },
              relistenFragments: {
                create: scene.relistenFragments.map((relistenFragment) => ({
                  id_fragment: relistenFragment.id_fragment,
                  relistenCount: relistenFragment.relistenCount,
                })),
              },
            })),
          },
        },
      })
    }),

  // saveLevelResult: publicProcedure
  //     .input(z.object({ text: z.string() }))
  //     .query(({ input }) => {
  //         return {
  //             greeting: `Hello ${input.text}`,
  //         };
  //     }),
})
