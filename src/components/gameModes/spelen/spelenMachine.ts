import { CountdownTimings } from 'types/Timings'
import { Latency } from 'types/latency'
import { createMachine, assign } from 'xstate'
import { start } from '~/components/fragmentPlayer/audio/AudioControls'
import {
  FragmentWithNotes,
  FragmentWithNotesAndTransposeDirection,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

const Transpose = (
  fragments: FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
  fragmentsToShow: number,
  shouldTranspose: boolean = true,
) => {
  const { transposeFragments } = useAudioServiceStore.getState()
  const { usedFragmentsMap, addUsedFragments, resetUsedFragments } = useLuisterenStore.getState()

  // Filter out fragments that have been played based on usedFragmentsMap
  let candidates = fragments.filter((f) => !usedFragmentsMap[f.id])
  const alwaysUsedFragments = fragments.filter((f) => f.useAlways)

  if (
    Object.keys(usedFragmentsMap).length === fragments.length ||
    candidates.length + alwaysUsedFragments.length < fragmentsToShow
  ) {
    resetUsedFragments()
    candidates = fragments
  }

  const shuffledFragments = candidates.sort(() => Math.random() - 0.5)
  const otherFragments = shuffledFragments.filter((f) => !f.useAlways)

  const amountToSelect = fragmentsToShow - alwaysUsedFragments.length
  const selectedOtherFragments = otherFragments.slice(0, amountToSelect)
  const selectedFragments = [...alwaysUsedFragments, ...selectedOtherFragments]

  addUsedFragments(selectedFragments.map((f) => f.id))

  if (!shouldTranspose)
    return selectedFragments.map((fragment) => {
      return { ...fragment, transpose: 0 }
    })
  const randomTransposeDirection = Math.floor(Math.random() * 12 - 0.0001) - 6
  const transposedFragments = transposeFragments(selectedFragments, randomTransposeDirection)

  const TransPosedfragmentsWithdirection = transposedFragments.map((fragment) => {
    return { ...fragment, transpose: randomTransposeDirection }
  })

  return TransPosedfragmentsWithdirection as FragmentWithNotesAndTransposeDirection[]
}

export const spelenMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'spelen',
    initial: 'idle',
    context: {
      isClickable: undefined as boolean | undefined,
      isAnimating: undefined as boolean | undefined,
      isLooping: undefined as boolean | undefined,
      allLevelFragments: [] as FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
      fragmentsToShow: 0 as number,
      activeFragment: undefined as FragmentWithNotes | undefined,
      shownFragments: [] as FragmentWithNotesAndTransposeDirection[],
      guessedFragment: undefined as FragmentWithNotes | undefined,
      countdownTimings: undefined as CountdownTimings | undefined,
      latency: undefined as Latency | undefined,
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
        | { type: 'FINISHEDLISTENING' }
        | { type: 'FINISHEDPLAYING' }
        | { type: 'CANCELLEDPLAYING' }
        | { type: 'GUESSEDFRAGMENT'; guessedFragment: FragmentWithNotes }
        | {
            type: 'STARTROUND'
            levelFragments: FragmentWithNotes[]
            fragmentsToShow: number
            countdownTimings: CountdownTimings
          },
    },
    tsTypes: {} as import('./spelenMachine.typegen').Typegen0,
    states: {
      idle: {
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
      },
      countdown: {
        entry: assign({ isClickable: false }),
        initial: '3',
        description: 'Has all the chid states for counting down before a scene starts',
        states: {
          '3': {
            entry: 'onCountdownStarted',
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
      },
      playing: {
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
            entry: assign({ isClickable: true }),
            on: {
              GUESSEDFRAGMENT: {
                target: 'listenToFragments',
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
            exit: assign({ isAnimating: false }),
          },
          guessHeardFragment: {
            entry: assign({
              latency: () => ({ startTime: Date.now(), endTime: 0, latency: 0 }),
            }),
            description: 'In this state the user can guess the heard fragment',
            on: {
              GUESSEDFRAGMENT: {
                target: 'listenToFragments',
                actions: ['setGuessedFragment', 'saveLatency'],
              },
            },
          },
          listenToFragments: {
            description: 'In this state the user can listen to all the fragments again',
            on: {
              FINISHEDLISTENING: '#spelen.countdown',
            },
          },
        },
      },
      FinishedPlayingSpelenMode: {
        entry: 'onFinishedPlaying',
        type: 'final',
      },
      CancelledPlayingSpelenMode: {
        entry: 'onFinishedPlaying',
        type: 'final',
      },
    },
    on: {
      FINISHEDPLAYING: {
        target: 'FinishedPlayingSpelenMode',
      },
      CANCELLEDPLAYING: {
        target: 'CancelledPlayingSpelenMode',
      },
    },
  },
  {
    actions: {
      setupData: assign((_, event) => {
        return {
          allLevelFragments: event.levelFragments,
          fragmentsToShow: event.fragmentsToShow,
          countdownTimings: event.countdownTimings,
        }
      }),
      setGuessedFragment: assign((_, event) => {
        return {
          isClickable: false,
          guessedFragment: event.guessedFragment,
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
      onFinishedPlaying: assign(() => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(false)
        return {}
      }),
      onCountdownStarted: assign((context) => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(true)
        const shuffledFragments = context.allLevelFragments?.sort(() => Math.random() - 0.5)
        let newActiveFragment: FragmentWithNotes | undefined = undefined
        let transposedFragments: FragmentWithNotesAndTransposeDirection[] | undefined = undefined
        if (shuffledFragments) {
          const { setPlayedFragmentId } = useLuisterenStore.getState()
          transposedFragments = Transpose(shuffledFragments, context.fragmentsToShow)
          newActiveFragment =
            transposedFragments?.[Math.floor(Math.random() * transposedFragments.length)]
          setPlayedFragmentId(newActiveFragment?.id ?? 0)
        }
        return {
          guessedFragment: undefined,
          shownFragments: transposedFragments,
          activeFragment: newActiveFragment,
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
