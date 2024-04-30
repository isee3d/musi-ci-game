import { DownloadSettingsSchema } from '~/pages/download'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const downloadRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        participantId: true,
        activities: true
      },
    })

    return users
  }),

  getAllSublevels: publicProcedure.query(async ({ ctx }) => {
    const sublevels = await ctx.prisma.subLevel.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return sublevels
  }),

  getAllGameModes: publicProcedure.query(async ({ ctx }) => {
    const gameModes = await ctx.prisma.gameMode.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return gameModes
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
      const dataPromises = []

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
        dataPromises.push(
          ctx.prisma.activity.findMany({
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
          }),
        )
      }

      if (worksheets.includes('Vragen en antwoorden')) {
        dataPromises.push(
          ctx.prisma.questionAnswer.findMany({
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
          }),
        )
      }

      if (worksheets.includes('Speelresultaten')) {
        dataPromises.push(
          ctx.prisma.levelResult.findMany({
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
          }),
        )
      }

      const [activitiesData, questionAnswersData, levelResultsData] =
        await Promise.all(dataPromises)

      return {
        levelResults: levelResultsData,
        questionAnswers: questionAnswersData,
        activities: activitiesData,
      }
    }),
})
