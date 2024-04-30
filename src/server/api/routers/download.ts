import { SceneFragment } from './../../../../prisma/generated/zod/index'
import { z } from 'zod'
import { DownloadSettingsSchema } from '~/pages/download'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const downloadRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        participantId: true,
        // role: true,
        // isAllowedToPlay: true,
        // createdAt: true,
        // levelResults: true,
        // questionAnswers: true,
        activities: true,
      },
    })

    return users
  }),
  // getAllLevels: publicProcedure.query(async ({ ctx }) => {
  //   const levels = await ctx.prisma.level.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       color: true,
  //       subLevels: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //       levelResult: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //     },
  //     // include: {
  //     //   subLevels: true,
  //     //   levelResult: true,
  //     // },
  //   })

  //   return levels
  // }),

  getAllSublevels: publicProcedure.query(async ({ ctx }) => {
    const sublevels = await ctx.prisma.subLevel.findMany({
      select: {
        id: true,
        name: true,
        // description: true,
        // color: true,
        // levels: {
        //   select: {
        //     id: true,
        //   },
        // },
        // fragments: {
        //   select: {
        //     id: true,
        //   },
        // },
        // gameModes: {
        //   select: {
        //     id: true,
        //   },
        // },
        // levelResult: {
        //   select: {
        //     id: true,
        //   },
        // },
        // questions: {
        //   select: {
        //     id: true,
        //   },
        // },
        // fragmentGroups: {
        //   select: {
        //     id: true,
        //   },
        // },
      },

      // include: {
      //   levels: true,
      //   fragments: true,
      //   gameModes: true,
      //   levelResult: true,
      //   questions: true,
      //   fragmentGroups: true,
      // },
    })

    return sublevels
  }),

  // getAllFragmentGroups: publicProcedure.query(async ({ ctx }) => {
  //   const fragmentGroups = await ctx.prisma.fragmentGroup.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       fragments: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //       subLevels: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //     },

  //     // include: {
  //     //   fragments: true,
  //     //   subLevels: true,
  //     // },
  //   })

  //   return fragmentGroups
  // }),

  // getAllFragments: publicProcedure.query(async ({ ctx }) => {
  //   const fragments = await ctx.prisma.fragment.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       useAlways: true,
  //       description: true,
  //       isActive: true,
  //       level: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //       chosenScene: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //       playedScene: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //       relistenfragment: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //       sceneFragment: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //       fragmentgroup: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //     },

  //     // include: {
  //     //   notes: true,
  //     //   level: true,
  //     //   chosenScene: true,
  //     //   playedScene: true,
  //     //   relistenfragment: true,
  //     //   sceneFragment: true,
  //     //   fragmentgroup: true,
  //     // },
  //   })

  //   return fragments
  // }),

  // getAllNotes: publicProcedure.query(async ({ ctx }) => {
  //   const notes = await ctx.prisma.note.findMany({
  //     select: {
  //       id_Fragment: true,
  //       id: true,
  //       name: true,
  //       time: true,
  //       duration: true,
  //       speed: true,
  //     },

  //     // include: {
  //     //   fragment: true,
  //     // },
  //   })

  //   return notes
  // }),

  getAllGameModes: publicProcedure.query(async ({ ctx }) => {
    const gameModes = await ctx.prisma.gameMode.findMany({
      select: {
        id: true,
        name: true,
        // amountOfScenes: true,
        // one: true,
        // two: true,
        // three: true,
        // go: true,
        // levels: {
        //   select: {
        //     id: true,
        //   },
        // },
        // levelResult: {
        //   select: {
        //     id: true,
        //   },
        // },
      },

      // include: {
      //   levels: true,
      //   levelResult: true,
      // },
    })

    return gameModes
  }),

  getAllLevelResults: publicProcedure.query(async ({ ctx }) => {
    const levelResults = await ctx.prisma.levelResult.findMany({
      select: {
        id: true,
        id_User: true,
        id_level: true,
        id_subLevel: true,
        id_gameMode: true,
        startTime: true,
        endTime: true,
        // score: true,
        Scenes: {
          select: {
            id: true,
          },
        },
      },

      // include: {
      //   user: true,
      //   Level: true,
      //   subLevel: true,
      //   gameMode: true,
      //   Scenes: true,
      // },
    })

    return levelResults
  }),

  getAllScenes: publicProcedure.query(async ({ ctx }) => {
    const scenes = await ctx.prisma.scene.findMany({
      select: {
        id: true,
        id_chosenFragment: true,
        id_levelResult: true,
        relistenFragments: true,
        id_playedFragment: true,
        chosenFragmentLatency: true,
        answeredCorrectly: true,
        sceneFragments: {
          select: {
            id: true,
          },
        },
      },

      // include: {
      //   chosenFragment: true,
      //   sceneFragments: true,
      //   levelResult: true,
      //   relistenFragments: true,
      //   playedFragment: true,
      // },
    })

    return scenes
  }),

  getAllSceneFragments: publicProcedure.query(async ({ ctx }) => {
    const sceneFragments = await ctx.prisma.sceneFragment.findMany({
      select: {
        id: true,
        id_fragment: true,
        id_Scene: true,
        fragmentIndex: true,
        groundTone: true,
        octave: true,
      },

      // include: {
      //   fragment: true,
      //   scene: true,
      // },
    })

    return sceneFragments
  }),

  getAllRelistenFragments: publicProcedure.query(async ({ ctx }) => {
    const relistenFragments = await ctx.prisma.relistenFragment.findMany({
      select: {
        id: true,
        id_scene: true,
        id_fragment: true,
        relistenCount: true,
      },
      // include: {
      //   scene: true,
      //   fragment: true,
      // },
    })

    return relistenFragments
  }),

  // getAllQuestionAnswers: publicProcedure.query(async ({ ctx }) => {
  //   const questionAnswer = await ctx.prisma.questionAnswer.findMany({
  //     select: {
  //       id: true,
  //       id_User: true,
  //       question: true,
  //       answer: true,
  //       answeredDate: true,
  //     },
  //     // include: {
  //     //   user: true,
  //     // },
  //   })

  //   return questionAnswer
  // }),

  // getAllQuestions: publicProcedure.query(async ({ ctx }) => {
  //   const questions = await ctx.prisma.question.findMany({
  //     select: {
  //       id: true,
  //       id_subLevel: true,
  //       question: true,
  //     },
  //   })

  //   return questions
  // }),

  getAllActivities: publicProcedure.query(async ({ ctx }) => {
    const activities = await ctx.prisma.activity.findMany({
      select: {
        id: true,
        id_User: true,
        activity: true,
        activity_Date: true,
      },

      // include: {
      //   user: true,
      // },
    })

    return activities
  }),

  getFilteredExcelData: publicProcedure
    .input(DownloadSettingsSchema)
    .query(async ({ ctx, input }) => {
      const { selectedUsers, selectedSublevels, selectedGameModes, date, worksheets } = input

      const selectedSublevelsNumbers = selectedSublevels.map((sublevel) => parseInt(sublevel, 10))
      const selectedGameModesNumbers = selectedGameModes.map((gameMode) => parseInt(gameMode, 10))

      let whereClause = {}
      let questionAnswersWhereClause = {}
      let activitiesWhereClause = {}
      let activitiesData = null
      let questionAnswersData = null
      let levelResultsData = null

      if (selectedUsers.length > 0) {
        //@ts-ignore
        whereClause.id_User = {
          in: selectedUsers,
        }
        //@ts-ignore
        activitiesWhereClause.id_User = {
          in: selectedUsers,
        }
        //@ts-ignore
        questionAnswersWhereClause.id_User = {
          in: selectedUsers,
        }
      }

      if (selectedSublevels.length > 0) {
        //@ts-ignore
        whereClause.id_subLevel = {
          in: selectedSublevelsNumbers,
        }
      }

      if (selectedGameModes.length > 0) {
        //@ts-ignore
        whereClause.id_gameMode = {
          in: selectedGameModesNumbers,
        }
      }

      if (date) {
        //@ts-ignore
        whereClause.startTime = {}
        if (date.from) {
          //@ts-ignore
          whereClause.startTime.gte = date.from
        }
        if (date.to) {
          //@ts-ignore
          whereClause.startTime.lte = date.to
        }

        if (date.from && date.to) {
          //@ts-ignore
          questionAnswersWhereClause.answeredDate = {
            gte: new Date(date.from),
            lte: new Date(date.to),
          }
          //@ts-ignore
          activitiesWhereClause.activity_Date = {
            gte: new Date(date.from),
            lte: new Date(date.to),
          }
        }
      }

      if (worksheets.includes('Activiteiten')) {
        activitiesData = await ctx.prisma.activity.findMany({
          where: activitiesWhereClause,
          select: {
            user: {
              select: {
                participantId: true,
              },
            },
            activity: true,
            activity_Date: true,
          },
        })
      }

      if (worksheets.includes('Vragen en antwoorden')) {
        questionAnswersData = await ctx.prisma.questionAnswer.findMany({
          where: questionAnswersWhereClause,
          select: {
            user: {
              select: {
                participantId: true,
              },
            },
            question: true,
            answer: true,
            answeredDate: true,
          },
        })
      }

      if (worksheets.includes('Speelresultaten')) {
        levelResultsData = await ctx.prisma.levelResult.findMany({
          where: whereClause,
          select: {
            user: {
              select: {
                participantId: true,
              },
            },
            subLevel: {
              select: {
                name: true,
              },
            },
            gameMode: {
              select: {
                name: true,
              },
            },
            startTime: true,
            endTime: true,
            Scenes: {
              select: {
                id: true,
                chosenFragment: {
                  select: {
                    name: true,
                  },
                },
                id_levelResult: true,
                playedFragment: {
                  select: {
                    name: true,
                  },
                },
                chosenFragmentLatency: true,
                startTime: true,
                answeredCorrectly: true,
                relistenFragments: {
                  select: {
                    fragment: {
                      select: {
                        name: true,
                      },
                    },
                    relistenCount: true,
                  },
                },
                sceneFragments: {
                  select: {
                    fragment: {
                      select: {
                        name: true,
                      },
                    },
                    fragmentIndex: true,
                    groundTone: true,
                    octave: true,
                  },
                },
              },
            },
          },
        })
      }

      return {
        levelResults: levelResultsData,
        questionAnswers: questionAnswersData,
        activities: activitiesData,
      }
    }),
})
