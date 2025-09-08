import {
  LevelResultOptionalDefaultsWithRelationsSchema,
  PointsOptionalDefaultsSchema,
} from '@zod-prisma'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

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
          Scenes: {
            create: input.Scenes.map((scene) => ({
              chosenFragmentLatency: scene.chosenFragmentLatency,
              id_chosenFragment: scene.id_chosenFragment ?? undefined,
              id_playedFragment: scene.id_playedFragment ?? undefined,
              startTime: scene.startTime ?? undefined,
              answeredCorrectly: scene.answeredCorrectly,
              sceneFragments: {
                create: scene.sceneFragments.map((fragment) => ({
                  id_fragment: fragment.id_fragment,
                  fragmentIndex: fragment.fragmentIndex,
                  groundTone: fragment.groundTone,
                  octave: fragment.octave,
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

  saveScore: protectedProcedure
    .input(z.object({ id_User: z.string(), score: z.number(), id_sublevel: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id_User, score, id_sublevel } = input

      if (score === 0) return

      return await ctx.prisma.points.create({
        data: {
          id_User,
          id_sublevel,
          points: score,
        },
      })
    }),
})
