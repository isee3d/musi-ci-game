import { SceneFragment } from './../../../../prisma/generated/zod/index'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const downloadRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        participantId: true,
        role: true,
        isAllowedToPlay: true,
        createdAt: true,
        levelResults: true,
        questionAnswers: true,
        activities: true,
      },
    })

    // const levels = await ctx.prisma.level.findMany({
    //   include: {
    //     subLevels: true,
    //     levelResult: true,
    //   },
    // })

    // const sublevels = await ctx.prisma.subLevel.findMany({
    //   include: {
    //     levels: true,
    //     fragments: true,
    //     gameModes: true,
    //     levelResult: true,
    //     questions: true,
    //     fragmentGroups: true,
    //   },
    // })

    // const fragmentGroups = await ctx.prisma.fragmentGroup.findMany({
    //   include: {
    //     fragments: true,
    //     subLevels: true,
    //   },
    // })

    // const fragments = await ctx.prisma.fragment.findMany({
    //   include: {
    //     notes: true,
    //     level: true,
    //     chosenScene: true,
    //     playedScene: true,
    //     relistenfragment: true,
    //     sceneFragment: true,
    //     fragmentgroup: true,
    //   },
    // })

    // const notes = await ctx.prisma.note.findMany({
    //   include: {
    //     fragment: true,
    //   },
    // })

    // const gameModes = await ctx.prisma.gameMode.findMany({
    //   include: {
    //     levels: true,
    //     levelResult: true,
    //   },
    // })

    // const levelResults = await ctx.prisma.levelResult.findMany({
    //   include: {
    //     user: true,
    //     Level: true,
    //     subLevel: true,
    //     gameMode: true,
    //     Scenes: true,
    //   },
    // })

    // const scenes = await ctx.prisma.scene.findMany({
    //   include: {
    //     chosenFragment: true,
    //     sceneFragments: true,
    //     levelResult: true,
    //     relistenFragments: true,
    //     playedFragment: true,
    //   },
    // })

    // const sceneFragments = await ctx.prisma.sceneFragment.findMany({
    //   include: {
    //     fragment: true,
    //     scene: true,
    //   },
    // })

    // const relistenFragments = await ctx.prisma.relistenFragment.findMany({
    //   include: {
    //     scene: true,
    //     fragment: true,
    //   },
    // })

    // const questionAnswer = await ctx.prisma.questionAnswer.findMany({
    //   include: {
    //     user: true,
    //   },
    // })

    // const activities = await ctx.prisma.activity.findMany({
    //   include: {
    //     user: true,
    //   },
    // })






    // const users = await ctx.prisma.user.findMany({
    //   select: {
    //     id: true,
    //     participantId: true,
    //     role: true,
    //     isAllowedToPlay: true,
    //     createdAt: true,
    //   },
    // })

    // const levels = await ctx.prisma.level.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     description: true,
    //     color: true,
    //     subLevels: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     levelResult: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //   },
    // })

    // const sublevels = await ctx.prisma.subLevel.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     description: true,
    //     color: true,

    //     levels: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     fragments: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     gameModes: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     levelResult: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     questions: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     fragmentGroups: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //   },
    // })

    // const fragmentGroups = await ctx.prisma.fragmentGroup.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     description: true,
    //     fragments: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     subLevels: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //   },
    // })

    // const fragments = await ctx.prisma.fragment.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     useAlways: true,
    //     description: true,
    //     isActive: true,

    //     level: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     chosenScene: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     playedScene: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     relistenfragment: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     sceneFragment: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     fragmentgroup: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //   },
    // })

    // const notes = await ctx.prisma.note.findMany({
    //   select: {
    //     id_Fragment: true,
    //     id: true,
    //     name: true,
    //     time: true,
    //     duration: true,
    //     speed: true,
    //   },
    // })

    // const gameModes = await ctx.prisma.gameMode.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     amountOfScenes: true,
    //     one: true,
    //     two: true,
    //     three: true,
    //     go: true,

    //     levels: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //     levelResult: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //   },
    // })

    // const levelResults = await ctx.prisma.levelResult.findMany({
    //   select: {
    //     id: true,
    //     id_User: true,
    //     id_level: true,
    //     id_subLevel: true,
    //     id_gameMode: true,
    //     startTime: true,
    //     endTime: true,
    //     score: true,
    //     Scenes: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //   },
    // })

    //   const scenes = await ctx.prisma.scene.findMany({
    //     select: {
    //       id: true,
    //       id_chosenFragment: true,
    //       id_levelResult: true,
    //       relistenFragments: true,
    //       id_playedFragment: true,
    //       chosenFragmentLatency: true,
    //       answeredCorrectly: true,
    //       sceneFragments: {
    //         select: {
    //           id: true,
    //         },
    //       },
    //     },
    //   })

    //   const sceneFragments = await ctx.prisma.sceneFragment.findMany({
    //     select: {
    //       id: true,
    //       id_fragment: true,
    //       id_Scene: true,
    //       fragmentIndex: true,
    //       groundTone: true,
    //       octave: true,
    //     },
    //   })

    //   const relistenFragments = await ctx.prisma.relistenFragment.findMany({
    //     select: {
    //       id: true,
    //       id_scene: true,
    //       id_fragment: true,
    //       relistenCount: true,
    //     },
    //   })

    //   const appSettings = await ctx.prisma.appSettings.findMany({
    //     select: {
    //       id: true,
    //       fragmentDotColor: true,
    //       fragmentDotLineColor: true,
    //     },
    //   })

    //   const questionAnswers = await ctx.prisma.questionAnswer.findMany({
    //     select: {
    //       id: true,
    //       id_User: true,
    //       question: true,
    //       answer: true,
    //       answeredDate: true,
    //     },
    //   })

    //   const questions = await ctx.prisma.question.findMany({
    //     select: {
    //       id: true,
    //       id_subLevel: true,
    //       question: true,
    //     },
    //   })

    //   const activities = await ctx.prisma.activity.findMany({
    //     select: {
    //       id: true,
    //       id_User: true,
    //       activity: true,
    //       activity_Date: true,
    //     },
    //   })

    return {
      users,
      // levels,
      // sublevels,
      // fragmentGroups,
      // fragments,
      // notes,
      // gameModes,
      // levelResults,
      // scenes,
      // sceneFragments,
      // relistenFragments,
      // questionAnswer,
      // activities,
      // levels,
      // sublevels,
      // fragmentGroups,
      // fragments,
      // notes,
      // gameModes,
      // levelResults,
      // scenes,
      // sceneFragments,
      // relistenFragments,
      // appSettings,
      // questionAnswers,
      // questions,
      // activities,
    }
  }),
})
