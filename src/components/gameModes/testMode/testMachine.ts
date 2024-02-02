import { CountdownTimings } from 'types/Timings'
import { FragmentGroup, FragmentGroupWithWeights } from 'types/fragmentGroup'
import { Latency } from 'types/latency'
import { assign, createMachine } from 'xstate'
import { start } from '~/components/fragmentPlayer/audio/AudioControls'
import { pianoNotesMap } from '~/components/fragmentPlayer/audio/Keyboard'
import {
  FragmentWithNotes,
  FragmentWithNotesAndWeight,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { StopwatchActions } from '~/hooks/useStopwatch'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { deepCopy } from '~/utils/deepCopy'

function filterFragmentsWithUseAlways(fragmentGroups: FragmentGroupWithWeights[]) {
  const filteredFragments: FragmentWithNotesAndWeight[] = []

  fragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment) => {
      if (fragment.useAlways === true) {
        filteredFragments.push(fragment)
      }
    })
  })

  return filteredFragments
}

function getFragmentsToShow(
  fragmentGroups: FragmentGroupWithWeights[],
  fragmentsToShowSize: number,
  usedFragmentsMap: {
    [fragmentId: number]: {
      [octaveNumber: number]: number
    }
  },
) {
  const alwaysUsedFragments = filterFragmentsWithUseAlways(fragmentGroups)

  let fragmentsToShow = [...alwaysUsedFragments]

  fragmentGroups.forEach((group) => {
    if (group.fragments.every((frag) => frag.useAlways)) {
      return
    }

    let leastUsedFragments: FragmentWithNotesAndWeight[] = []
    let minUsageCount = Number.MAX_VALUE

    group.fragments.forEach((fragment) => {
      // Calculate the total usage across all octaves for this fragment
      const totalUsageCount = Object.values(usedFragmentsMap[fragment.id] || {}).reduce(
        (sum, count) => sum + count,
        0,
      )

      if (totalUsageCount < minUsageCount) {
        minUsageCount = totalUsageCount
        leastUsedFragments = [fragment]
      } else if (totalUsageCount === minUsageCount) {
        leastUsedFragments.push(fragment)
      }
    })

    if (leastUsedFragments.length) {
      // Randomly select a fragment from the least used fragments
      const randomIndex = Math.floor(Math.random() * leastUsedFragments.length)
      const randomLeastUsedFragment = leastUsedFragments[randomIndex]
      if (randomLeastUsedFragment) {
        fragmentsToShow.push(randomLeastUsedFragment)
      }
    }
  })

  return fragmentsToShow.slice(0, fragmentsToShowSize)
}

function getTotalFragmentCount(fragmentGroups: FragmentGroupWithWeights[]) {
  let totalCount = 0
  // Iterate through each fragment group
  fragmentGroups.forEach((group) => {
    // Add the count of fragments that do not have `useAlways` set to true
    totalCount += group.fragments.length
  })

  return totalCount
}

function filterPlayableFragments(
  sceneFragments: FragmentWithNotesAndWeight[],
  fragmentGroups: FragmentGroupWithWeights[],
  amountOfScenes: number,
  usedFragmentsMap: {
    [fragmentId: number]: {
      [octaveNumber: number]: number
    }
  },
) {
  const totlaFragmentCount = getTotalFragmentCount(fragmentGroups)
  const threshold = amountOfScenes / totlaFragmentCount

  return sceneFragments.filter((fragment) => {
    // Calculate the total usage across all octaves for this fragment
    const totalUsageCount = Object.values(usedFragmentsMap[fragment.id] || {}).reduce(
      (sum, count) => sum + count,
      0,
    )

    return totalUsageCount < threshold // Compare the total usage count with the threshold
  })
}

function getPlayableOctavesForFragment(
  newActiveFragmentId: number,
  availableOctaves: number[],
  amountOfScenes: number,
  newUsedFragmentsMap: {
    [fragmentId: number]: {
      [octaveNumber: number]: number
    }
  },
  fragmentGroups: FragmentGroupWithWeights[],
) {
  const totalFragmentCount = getTotalFragmentCount(fragmentGroups)
  // Determine the threshold
  const totalFragmentsPerOctave = availableOctaves.length
  const threshold = Math.ceil(amountOfScenes / totalFragmentsPerOctave / totalFragmentCount)
  // Get the usage map for the new active fragment
  const fragmentUsageMap = newUsedFragmentsMap[newActiveFragmentId] || {}
  // Filter out the octaves that have not exceeded the threshold
  const playableOctaves = availableOctaves.filter((octave) => {
    const usageCount = fragmentUsageMap[octave] || 0
    return usageCount < threshold
  })

  return playableOctaves
}

export const transpose = (
  fragmentsToShow: number,
  amountOfScenes: number,
  fragmentGroups: FragmentGroupWithWeights[],
  pianoNotesMap: Map<string, { noteNumber: number; weight: number }>,
) => {
  const { chooseWeightedActiveFragment, transposeWeightedFragments } =
    useAudioServiceStore.getState()
  const { newUsedFragmentsMap, addNewUsedFragment } = useLuisterenStore.getState()

  const fragmentsForScene = getFragmentsToShow(fragmentGroups, fragmentsToShow, newUsedFragmentsMap)

  const potentialActiveFragments = filterPlayableFragments(
    fragmentsForScene,
    fragmentGroups,
    amountOfScenes,
    newUsedFragmentsMap,
  )

  const weightAdjustedFragmentGroups = deepCopy(fragmentGroups)

  const newActiveFragment = chooseWeightedActiveFragment(potentialActiveFragments)
  if (!newActiveFragment) throw new Error('No new active fragment available')

  weightAdjustedFragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment, index) => {
      const potentialMatch = potentialActiveFragments.find(
        (potential) => potential.id === fragment.id,
      )
      if (potentialMatch) {
        group.fragments[index] = potentialMatch
      }
    })
  })

  const availableOctavesForNewActiveFragment = getPlayableOctavesForFragment(
    newActiveFragment.id,
    [3, 4, 5],
    amountOfScenes,
    newUsedFragmentsMap,
    fragmentGroups,
  )

  const randomOctaveIndex = Math.floor(Math.random() * availableOctavesForNewActiveFragment.length)
  const randomOctave = availableOctavesForNewActiveFragment[randomOctaveIndex]

  const transposedFragments = transposeWeightedFragments(
    fragmentsForScene,
    randomOctave ?? 0,
    [3, 4, 5],
    pianoNotesMap,
  )

  addNewUsedFragment(newActiveFragment.id, randomOctave ?? 0)

  return { transposedFragments, newActiveFragment, pianoNotesMap, weightAdjustedFragmentGroups }
}

export const testModeMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'testMode',
    initial: 'idle',
    context: {
      isClickable: undefined as boolean | undefined,
      isAnimating: undefined as boolean | undefined,
      isLooping: undefined as boolean | undefined,
      originalFragmentGroups: [] as FragmentGroup[],
      selectedGroup: undefined as FragmentGroup | undefined,
      fragmentsToShow: 0 as number,
      activeFragment: undefined as FragmentWithNotes | undefined,
      shownFragments: [] as FragmentWithNotesAndWeight[],
      guessedFragment: undefined as FragmentWithNotes | undefined,
      countdownTimings: undefined as CountdownTimings | undefined,
      countdownActions: undefined as StopwatchActions | undefined,
      latency: undefined as Latency | undefined,
      amountOfScenes: 0 as number,
      amountPlayed: 0 as number,
      groups: [] as FragmentGroupWithWeights[],
      pianoNotesMap: undefined as Map<string, { noteNumber: number; weight: number }> | undefined,
    },
    schema: {
      services: {} as {
        playAudio: {
          data: void
        }
      },
      events: {} as
        | { type: 'STARTCOUNTDOWN' }
        | { type: 'STARTCOUNTDOWN' }
        | { type: 'FINISH' }
        | { type: 'RESTART' }
        | { type: 'SOUNDFINISHED' }
        | { type: 'ANSWEREDQUESTIONS' }
        | { type: 'FINISHEDPLAYING' }
        | { type: 'RESUMEGAME' }
        | { type: 'PAUSEGAME' }
        | { type: 'GUESSEDFRAGMENT'; guessedFragment: FragmentWithNotes | undefined }
        | {
            type: 'STARTROUND'
            originalFragmentGroups: FragmentGroup[]
            fragmentsToShow: number
            countdownTimings: CountdownTimings
            amountOfScenes: number
            countdownActions: StopwatchActions
            groups: FragmentGroup[]
          },
    },
    tsTypes: {} as import('./testMachine.typegen').Typegen0,
    states: {
      idle: {
        description: 'The state where the context data will be initialized',
        on: {
          STARTROUND: {
            target: 'startRound',
            actions: ['setupData', 'startPlaying'],
          },
        },
      },
      // answeringQuestions: {
      //   description: 'The state where the user is answering the questions for the test',
      //   on: {
      //     ANSWEREDQUESTIONS: {
      //       target: 'startRound',
      //       actions: 'startPlaying',
      //     },
      //   },
      // },
      startRound: {
        entry: 'initializeContext',
        description: 'Starts a new round & Shows the start and back to overview button',
        on: {
          STARTCOUNTDOWN: 'countdown',
        },
        // exit: (context) => context.countdownActions?.start(),
        // exit: "initTimer"
      },
      countdown: {
        entry: (context) => context.countdownActions?.start(),
        initial: '3',
        description: 'Has all the chid states for counting down before a scene starts',
        states: {
          '3': {
            after: {
              THREE: '2',
            },
          },
          '2': {
            after: {
              TWO: '1',
            },
          },
          '1': {
            after: {
              ONE: 'GO!',
            },
          },
          'GO!': {
            after: {
              GO: '#testMode.playing',
            },
          },
        },
      },
      playing: {
        entry: 'onCountdownStarted',
        initial: 'initializePlaying',
        states: {
          hist: {
            type: 'history',
          },
          initializePlaying: {
            description: 'Loads the new view, at the moment the fragments need to initialize...',
            after: {
              SOUNDTIME: 'playSound',
            },
            exit: assign({ isClickable: false, isAnimating: true }),
          },
          playSound: {
            entry: (context) => context.countdownActions?.resume(),
            invoke: {
              src: async (context) => await start(context.activeFragment),
              onDone: [
                {
                  target: 'guessHeardFragment',
                },
              ],
            },
            description: 'In this state the active fragment is played',
            exit: assign({ isClickable: true, isAnimating: false }),
          },
          guessHeardFragment: {
            entry: assign({
              isClickable: true,
              isAnimating: false,
              latency: () => ({ startTime: Date.now(), endTime: 0, latency: 0 }),
            }),
            description: 'In this state the user can guess the heard fragment',
            on: {
              GUESSEDFRAGMENT: {
                target: 'restAfterAnswering',
                actions: ['setGuessedFragment', 'saveLatency'],
              },
            },
            // after: {
            //   10000: {
            //     target: 'didNotAnswerFragment',
            //     actions: 'timedOutAnswering',
            //   },
            // },
          },
          // didNotAnswerFragment: {
          //   after: {
          //     3000: 'restAfterAnswering',
          //   },
          // },
          restAfterAnswering: {
            entry: [(context) => context.countdownActions?.pause(), 'saveScene'],
            description: 'In this state the users gets a 1 second rest and the timer has to stop',
            after: {
              1000: '#testMode.playing',
            },
            exit: [
              assign({
                amountPlayed: (context) => context.amountPlayed + 1,
              }),
              (context) => context.countdownActions?.resume(),
            ],
          },
        },
      },
      pausedGame: {
        description: 'The state where the game is paused',
        on: {
          RESUMEGAME: 'playing.hist',
        },
      },
      FinishedPlayingTestMode: {
        entry: [(context) => context.countdownActions?.reset(), 'onFinishedPlaying'],
        type: 'final',
      },
    },
    on: {
      FINISHEDPLAYING: 'FinishedPlayingTestMode',
      PAUSEGAME: '#testMode.pausedGame',
    },
  },
  {
    actions: {
      // timedOutAnswering: assign((context, event) => {
      //   const { setChosenFragmentLatency, setChosenFragment, addNewUserSceneAnswer } =
      //     useLuisterenStore.getState()
      //   context.countdownActions?.pause()
      //   addNewUserSceneAnswer(undefined)
      //   setChosenFragment(undefined)
      //   if (context.latency) {
      //     setChosenFragmentLatency(-1)
      //   }
      //   return {
      //     guessedFragment: undefined,
      //   }
      // }),
      setupData: assign((_, event) => {
        const {
          originalFragmentGroups,
          fragmentsToShow,
          amountOfScenes,
          countdownTimings,
          countdownActions,
        } = event

        const { resetUsedFragments } = useLuisterenStore.getState()

        resetUsedFragments()

        // Add a weight to every fragment at the start of the game

        const convertedFragmentGroups = originalFragmentGroups.map((group) => ({
          ...group,
          fragments: group.fragments.map((fragment) => ({
            ...fragment,
            weight: 100,
          })),
        }))

        return {
          originalFragmentGroups: originalFragmentGroups,
          fragmentsToShow,
          amountOfScenes,
          countdownTimings,
          countdownActions,
          groups: convertedFragmentGroups,
          pianoNotesMap: pianoNotesMap,
        }
      }),
      startPlaying: () => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(true)
      },
      saveLatency: assign({
        latency: (context) => {
          if (context.latency) {
            const { setChosenFragmentLatency } = useLuisterenStore.getState()
            const endTime = Date.now()
            const latency = endTime - context.latency.startTime
            setChosenFragmentLatency(latency)
            return { ...context.latency, endTime, latency }
          }
          return context.latency
        },
        isClickable: undefined,
        isAnimating: undefined,
      }),
      saveScene: () => {
        const { addScene, sceneData, resetSceneRelatedData } = useLuisterenStore.getState()
        addScene(sceneData)
        resetSceneRelatedData()
      },
      setGuessedFragment: assign((context, event) => {
        context.countdownActions?.pause()
        return {
          guessedFragment: event.guessedFragment || undefined,
        }
      }),
      onFinishedPlaying: () => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(false)
      },
      initializeContext: assign(() => {
        return {
          isClickable: false,
          isAnimating: false,
          isLooping: false,
          activeFragment: undefined,
          guessedFragment: undefined,
          // shownFragments: [],
          fragmentGroups: [],
        }
      }),
      onCountdownStarted: assign((context) => {
        const { setPlayedFragmentId } = useLuisterenStore.getState()
        const copiedGroups = deepCopy(context.groups)
        const { transposedFragments, newActiveFragment, pianoNotesMap, weightAdjustedFragmentGroups } = transpose(
          context.fragmentsToShow,
          context.amountOfScenes,
          copiedGroups,
          context.pianoNotesMap ?? new Map(),
        )
        setPlayedFragmentId(newActiveFragment?.id ?? 0)
        return {
          groups: weightAdjustedFragmentGroups,
          guessedFragment: undefined,
          shownFragments: transposedFragments,
          activeFragment: newActiveFragment,
          pianoNotesMap: pianoNotesMap,
        }
      }),
    },
    delays: {
      THREE: (context) => context.countdownTimings?.three ?? 1000,
      TWO: (context) => context.countdownTimings?.two ?? 1000,
      ONE: (context) => context.countdownTimings?.one ?? 1000,
      GO: (context) => context.countdownTimings?.go ?? 1000,
      SOUNDTIME: (context) => 1000,
    },
  },
)
