import { CountdownTimings } from 'types/Timings'
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

const transpose = (
  fragments: FragmentWithNotesAndWeight[],
  fragmentsToShow: number,
  pianoNotesMap: Map<string, { noteNumber: number; weight: number }>,
) => {
  const { transposeWeightedFragments, chooseWeightedActiveFragment } =
    useAudioServiceStore.getState()
  const { addNewUsedFragment } = useLuisterenStore.getState()

  const newActiveFragment = chooseWeightedActiveFragment(fragments)
  if (!newActiveFragment) throw new Error('No new active fragment available')

  const alwaysUsedFragments = fragments.filter((f) => f.useAlways && f.id !== newActiveFragment.id)
  let selectedFragments = [newActiveFragment]
  selectedFragments = [...alwaysUsedFragments, ...selectedFragments]

  const remainingFragments = fragments.filter((f) => !selectedFragments.includes(f))
  const amountToFill = fragmentsToShow - selectedFragments.length
  const additionalFragments: FragmentWithNotesAndWeight[] = []
  for (let i = 0; i < amountToFill; i++) {
    if (remainingFragments.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingFragments.length)
      const selectedFragment = remainingFragments[randomIndex]
      if (selectedFragment) {
        additionalFragments.push(selectedFragment)
        remainingFragments.splice(randomIndex, 1)
      }
    }
  }

  selectedFragments = [...selectedFragments, ...additionalFragments]

  const octaves = [3, 4, 5]
  const randomOctave = octaves[Math.floor(Math.random() * octaves.length)]

  const weightAdjustedFragments = deepCopy(fragments)

  const transposedFragments = transposeWeightedFragments(
    selectedFragments,
    randomOctave ?? 3,
    octaves,
    pianoNotesMap,
  )

  addNewUsedFragment(newActiveFragment.id, randomOctave ?? 0)

  return { transposedFragments, newActiveFragment, pianoNotesMap, weightAdjustedFragments }
}

export const uitdagingMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'spelen',
    initial: 'idle',
    context: {
      isClickable: undefined as boolean | undefined,
      isAnimating: undefined as boolean | undefined,
      isLooping: undefined as boolean | undefined,
      allLevelFragments: [] as FragmentWithNotesAndWeight[],
      fragmentsToShow: 0 as number,
      activeFragment: undefined as FragmentWithNotes | undefined,
      shownFragments: [] as FragmentWithNotesAndWeight[],
      guessedFragment: undefined as FragmentWithNotes | undefined,
      countdownTimings: undefined as CountdownTimings | undefined,
      countdownActions: undefined as StopwatchActions | undefined,
      latency: undefined as Latency | undefined,
      amountPlayed: 0 as number,
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
        | { type: 'EXITGAME' }
        | { type: 'RESTARTMACHINE' }
        | { type: 'SOUNDFINISHED' }
        | { type: 'FINISHEDPLAYING' }
        | { type: 'GUESSEDFRAGMENT'; guessedFragment: FragmentWithNotes }
        | {
            type: 'STARTROUND'
            levelFragments: FragmentWithNotes[]
            fragmentsToShow: number
            countdownTimings: CountdownTimings
            countdownActions: StopwatchActions
          },
    },
    tsTypes: {} as import('./uitdagingMachine.typegen').Typegen0,
    states: {
      idle: {
        entry: 'resetPlaying',
        description: 'The state where the context data will be initialized',
        on: {
          STARTROUND: {
            target: 'startRound',
            actions: 'setupData',
          },
        },
      },
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
              GO: '#spelen.playing',
            },
          },
        },
        exit: 'onCountdownEnded',
      },
      playing: {
        entry: 'onPlayingStarted',
        initial: 'initializePlaying',
        states: {
          initializePlaying: {
            description: 'Loads the new view, at the moment the fragments need to initialize...',
            after: {
              SOUNDTIME: 'playSound',
            },
            exit: assign({ isAnimating: true }),
          },
          playSound: {
            entry: [
              assign({ isClickable: true }),
              assign({
                latency: () => ({ startTime: Date.now(), endTime: 0, latency: 0 }),
              }),
            ],
            on: {
              GUESSEDFRAGMENT: {
                target: 'restAfterAnswering',
                actions: ['setGuessedFragment', 'saveLatency'],
              },
            },
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
            description: 'In this state the user can guess the heard fragment',
            on: {
              GUESSEDFRAGMENT: {
                target: 'restAfterAnswering',
                actions: ['setGuessedFragment', 'saveLatency'],
              },
            },
            exit: [],
          },
          restAfterAnswering: {
            entry: ['saveScene'],
            description: 'In this state the users gets a 1 second rest and the timer has to stop',
            after: {
              1000: '#spelen.playing',
            },
            exit: [
              assign({
                amountPlayed: (context) => context.amountPlayed + 1,
              }),
              // (context) => context.countdownActions?.resume(),
            ],
          },
        },
      },
      FinishedPlayingUitdagingMode: {
        entry: [(context) => context.countdownActions?.reset(), 'onFinishedPlaying'],
      },
      ExitGame: {
        type: 'final',
      },
    },
    on: {
      FINISHEDPLAYING: 'FinishedPlayingUitdagingMode',
      EXITGAME: {
        target: 'ExitGame',
      },
      RESTARTMACHINE: {
        target: 'idle',
        actions: assign((context) => {
          return {
            isClickable: undefined,
            isAnimating: undefined,
            isLooping: undefined,
            allLevelFragments: [],
            fragmentsToShow: 0,
            activeFragment: undefined,
            shownFragments: [],
            guessedFragment: undefined,
            countdownTimings: undefined,
            countdownActions: undefined,
            latency: undefined,
            amountPlayed: 0,
            pianoNotesMap: undefined,
          }
        }),
      },
    },
  },
  {
    actions: {
      setupData: assign((_, event) => {
        const fragmentsWithWeight = event.levelFragments.map((fragment) => {
          return { ...fragment, weight: 100 }
        }) as FragmentWithNotesAndWeight[]

        return {
          allLevelFragments: fragmentsWithWeight,
          fragmentsToShow: event.fragmentsToShow,
          countdownTimings: event.countdownTimings,
          countdownActions: event.countdownActions,
          pianoNotesMap: pianoNotesMap,
          amountPlayed: 0,
        }
      }),
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
        // context.countdownActions?.pause()
        return {
          guessedFragment: event.guessedFragment,
        }
      }),
      onFinishedPlaying: () => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(false)
      },
      resetPlaying: assign((_, event) => {
        const { reset } = useLuisterenStore.getState()
        reset()
        return {}
      }),
      initializeContext: assign(() => {
        return {
          isClickable: false,
          isAnimating: false,
          isLooping: false,
          activeFragment: undefined,
          guessedFragment: undefined,
          shownFragments: [],
        }
      }),
      onPlayingStarted: assign((context) => {
        const { setPlayedFragmentId, setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(true)
        const copiedFragments = deepCopy(context.allLevelFragments)
        const { transposedFragments, newActiveFragment, pianoNotesMap, weightAdjustedFragments } =
          transpose(copiedFragments, context.fragmentsToShow, context.pianoNotesMap ?? new Map())

        setPlayedFragmentId(newActiveFragment?.id ?? 0)
        return {
          allLevelFragments: weightAdjustedFragments,
          guessedFragment: undefined,
          shownFragments: transposedFragments,
          activeFragment: newActiveFragment,
          pianoNotesMap: pianoNotesMap,
        }
      }),
      onCountdownEnded: assign((context) => {
        const { setStartTime } = useLuisterenStore.getState()
        context.countdownActions?.start()
        setStartTime(Date.now())
        return context
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
