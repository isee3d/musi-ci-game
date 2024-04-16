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
import { test_1, test_2 } from '~/components/gameModes/testMode/testJsonData'
import { StopwatchActions } from '~/hooks/useStopwatch'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { deepCopy } from '~/utils/deepCopy'
import { transpose, transposeTestOne, transposeTestTwo } from '~/utils/testUtils'

export const testModeMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'testMode',
    initial: 'idle',
    context: {
      isClickable: undefined as boolean | undefined,
      isAnimating: undefined as boolean | undefined,
      sublevelName: undefined as string | undefined,
      originalFragments: [] as FragmentWithNotes[],
      // isLooping: undefined as boolean | undefined,
      // originalFragmentGroups: [] as FragmentGroup[],
      // selectedGroup: undefined as FragmentGroup | undefined,
      fragmentsToShow: 0 as number,
      activeFragment: undefined as FragmentWithNotes | undefined,
      shownFragments: [] as FragmentWithNotes[],
      guessedFragment: undefined as FragmentWithNotes | undefined,
      countdownTimings: undefined as CountdownTimings | undefined,
      latency: undefined as Latency | undefined,
      amountOfScenes: 0 as number,
      amountPlayed: 0 as number,
      // groups: [] as FragmentGroupWithWeights[],
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
            originalFragments: FragmentWithNotes[]
            sublevelName: string | undefined
            // originalFragmentGroups: FragmentGroup[]
            // fragmentsToShow: number
            countdownTimings: CountdownTimings
            amountOfScenes: number
            // groups: FragmentGroup[]
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
      startRound: {
        entry: 'initializeContext',
        description: 'Starts a new round & Shows the start and back to overview button',
        on: {
          STARTCOUNTDOWN: 'countdown',
        },
      },
      countdown: {
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
          // hist: {
          //   type: 'history',
          // },
          initializePlaying: {
            description: 'Loads the new view, at the moment the fragments need to initialize...',
            after: {
              SOUNDTIME: 'playSound',
            },
            exit: assign({ isClickable: false, isAnimating: true }),
          },
          playSound: {
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
                actions: ['setGuessedFragment', 'saveLatency', 'saveScene'],
              },
            },
          },
          restAfterAnswering: {
            description: 'In this state the users gets a 1 second rest and the timer has to stop',
            after: {
              1000: '#testMode.playing',
            },
          },
        },
      },
      pausedGame: {
        description: 'The state where the game is paused',
        on: {
          RESUMEGAME: 'playing',
        },
      },
      FinishedPlayingTestMode: {
        entry: ['onFinishedPlaying'],
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
      setupData: assign((_, event) => {
        const {
          // originalFragmentGroups,
          // fragmentsToShow,
          amountOfScenes,
          originalFragments,
          sublevelName,
          countdownTimings,
        } = event

        const { resetUsedFragments, setTestOneArray, setTestTwoArray } =
          useLuisterenStore.getState()

        resetUsedFragments()
        setTestOneArray(test_1)
        setTestTwoArray(test_2)

        return {
          amountOfScenes,
          originalFragments,
          sublevelName,
          countdownTimings,
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
          // isLooping: false,
          activeFragment: undefined,
          guessedFragment: undefined,
          fragmentGroups: [],
        }
      }),
      onCountdownStarted: assign((context) => {
        const { setPlayedFragmentId } = useLuisterenStore.getState()
        console.log('im coming in this state')
        const originalFragments = deepCopy(context.originalFragments)

        let activeFragment: FragmentWithNotes | undefined = undefined
        let newTransposedFragments: FragmentWithNotes[] = []

        if (context.sublevelName === 'TEST, level 1') {
          console.log('going to remove from test one')
          const { transposedFragments, newActiveFragment } = transposeTestOne(originalFragments)
          activeFragment = newActiveFragment
          newTransposedFragments = transposedFragments
        } else if (context.sublevelName === 'TEST, level 2') {
          const { transposedFragments, newActiveFragment } = transposeTestTwo(originalFragments)
          activeFragment = newActiveFragment
          newTransposedFragments = transposedFragments
        }
        setPlayedFragmentId(activeFragment?.id ?? 0)
        return {
          amountPlayed: context.amountPlayed + 1,
          // groups: weightAdjustedFragmentGroups,
          guessedFragment: undefined,
          shownFragments: newTransposedFragments,
          activeFragment: activeFragment,
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
