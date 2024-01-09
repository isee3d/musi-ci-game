import { FragmentGroup, FragmentGroupWithWeights } from 'types/fragmentGroup'
import { CountdownTimings } from 'types/Timings'
import { Latency } from 'types/latency'
import { createMachine, assign } from 'xstate'
import { start } from '~/components/fragmentPlayer/audio/AudioControls'
import {
  FragmentWithNotes,
  FragmentWithNotesAndTransposeDirection,
  FragmentWithNotesAndWeight,
  FragmentWithNotesWeightAndTransposeDirection,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { StopwatchActions } from '~/hooks/useStopwatch'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { deepCopy } from '~/utils/deepCopy'

const Transpose = (
  fragmentsToShow: number,
  amountPlayed: number,
  amountOfScenes: number,
  fragmentGroups: FragmentGroupWithWeights[],
) => {
  const { transposeFragments } = useAudioServiceStore.getState()
  const { usedFragmentsMap, addUsedFragments, resetUsedFragments } = useLuisterenStore.getState()

  // Determine the octave based on the amount played
  let octave = 3 + Math.floor(amountPlayed / (amountOfScenes / 3))
  if (amountPlayed % (amountOfScenes / 3) === 0 && octave !== 0) {
    resetUsedFragments()
  }
  // Cap octave at 5
  if (octave > 5) octave = 5

  // Probabilistic threshold for maximum plays per fragment
  const baseThreshold = Math.floor(amountOfScenes / fragmentGroups.length)
  const probThreshold = baseThreshold + (Math.random() < 0.5 ? 1 : 0)

  // Select a random fragment group
  const randomGroupIndex = Math.floor(Math.random() * fragmentGroups.length)
  const selectedGroup = fragmentGroups[randomGroupIndex]

  if (!selectedGroup) {
    throw new Error('No selected group available')
  }

  // Separate out the fragments that are marked "useAlways"
  const alwaysUseFragments = selectedGroup.fragments.filter((f) => f.useAlways)
  const otherFragments = selectedGroup.fragments.filter((f) => !f.useAlways)

  // Filter fragments that haven't been played more than the threshold
  const candidates = otherFragments.filter((f) => (usedFragmentsMap[f.id] || 0) < probThreshold)
  // Shuffle and select the required number of fragments
  const shuffledCandidates = candidates.sort(() => Math.random() - 0.5)
  const remainingSpots = fragmentsToShow - alwaysUseFragments.length
  const selectedFromCandidates = shuffledCandidates.slice(0, remainingSpots)

  const selectedFragments = [...alwaysUseFragments, ...selectedFromCandidates]

  // Transpose the selected fragments
  const randomTransposeDirection = Math.floor(Math.random() * 12 - 0.0001) - 6
  let transposedFragments: FragmentWithNotesAndWeight[] = []
  if ([3, 4, 5].includes(octave)) {
    transposedFragments = transposeFragments(selectedFragments, randomTransposeDirection, octave) as FragmentWithNotesAndWeight[]
  }

  // Update the used fragments map
  addUsedFragments(transposedFragments.map((f) => f.id))

  return {
    transposedFragments: transposedFragments.map((fragment) => ({
      ...fragment,
      transpose: randomTransposeDirection,
      octave: octave,
    })) as FragmentWithNotesWeightAndTransposeDirection[],
    selectedGroup,
  }
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
      shownFragments: [] as FragmentWithNotesAndTransposeDirection[],
      guessedFragment: undefined as FragmentWithNotes | undefined,
      countdownTimings: undefined as CountdownTimings | undefined,
      countdownActions: undefined as StopwatchActions | undefined,
      latency: undefined as Latency | undefined,
      amountOfScenes: 0 as number,
      amountPlayed: 0 as number,
      groups: [] as FragmentGroupWithWeights[],
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
            // history: 'deep',
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
          groups,
        } = event

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
        const { chooseWeightedActiveFragment } = useAudioServiceStore.getState()
        const copiedGroups = deepCopy(context.groups)
        const { transposedFragments, selectedGroup } = Transpose(
          // copiedFragments,
          context.fragmentsToShow,
          context.amountPlayed,
          context.amountOfScenes,
          copiedGroups,
        )

        // const newActiveFragment =
        //   transposedFragments?.[Math.floor(Math.random() * transposedFragments.length)]

        const newActiveFragment = chooseWeightedActiveFragment(transposedFragments)

        setPlayedFragmentId(newActiveFragment?.id ?? 0)
        return {
          guessedFragment: undefined,
          shownFragments: transposedFragments,
          activeFragment: newActiveFragment,
          selectedGroup: selectedGroup,
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
