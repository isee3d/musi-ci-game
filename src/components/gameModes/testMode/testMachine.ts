import { FragmentGroup } from 'types/fragmentGroup'
import { CountdownTimings } from 'types/Timings'
import { Latency } from 'types/latency'
import { createMachine, assign } from 'xstate'
import { start } from '~/components/fragmentPlayer/audio/AudioControls'
import {
  FragmentWithNotes,
  FragmentWithNotesAndTransposeDirection,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { StopwatchActions } from '~/hooks/useStopwatch'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

const Transpose = (
  fragments: FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
  fragmentsToShow: number,
  amountPlayed: number,
  amountOfScenes: number,
  fragmentGroups?: FragmentGroup[]
) => {
  const { transposeFragmentsInOctave } = useAudioServiceStore.getState()
  const { usedFragmentsMap, addUsedFragments, resetUsedFragments } = useLuisterenStore.getState()
  // check which octave to use based on amount of scenes played
  let octave = Math.floor(amountPlayed / (amountOfScenes / 3))
  if (amountPlayed % (amountOfScenes / 3) === 0 && octave !== 0) {
    resetUsedFragments()
  }
  // Cap octave at 2
  if (octave > 2) octave = 2

  const alwaysUsedFragments = fragments.filter((f) => f.useAlways)
  const otherFragments = fragments.filter((f) => !f.useAlways)

  // Probabilistic threshold for maximum plays per fragment
  const baseThreshold = Math.floor(amountOfScenes / fragments.length - alwaysUsedFragments.length)
  const probThreshold = baseThreshold + (Math.random() < 0.5 ? 1 : 0)

   let candidates: FragmentWithNotes[] = []

   // If fragmentGroups is defined and has at least one element, select a random group
   if (fragmentGroups && fragmentGroups.length > 0) {
     // Create a copy of fragmentGroups to avoid modifying the original array
     let groups = [...fragmentGroups]

     while (candidates.length < fragmentsToShow - alwaysUsedFragments.length && groups.length > 0) {
       const randomIndex = Math.floor(Math.random() * groups.length)
       const randomGroup = groups[randomIndex]
       if(randomGroup){
         const groupFragmentIds = randomGroup.fragments.map((f) => f.id)

         // Only keep fragments whose id exists in the selected group
         let groupFragments = otherFragments.filter((f) => groupFragmentIds.includes(f.id))

         let groupCandidates = groupFragments.filter(
           (f) => (usedFragmentsMap[f.id] || 0) < probThreshold
         )

         // Concatenate the new candidates with the existing ones
         candidates = [...candidates, ...groupCandidates]
       }

       // Remove the group from the list to avoid choosing it again
       groups.splice(randomIndex, 1)
     }
   }

  if (candidates.length === 0) {
    // All fragments have been played at least probThreshold times
    console.log('All fragments have been played the maximum number of times')
    candidates = otherFragments
  }

  const shuffledCandidates = candidates.sort(() => Math.random() - 0.5)
  const selectedCandidates = shuffledCandidates.slice(
    0,
    fragmentsToShow - alwaysUsedFragments.length
  )

  const selectedFragments = [...alwaysUsedFragments, ...selectedCandidates]

  const randomTransposeDirection = Math.floor(Math.random() * 12 - 0.0001) - 6
  let transposedFragments: FragmentWithNotes[] = []
  if ([0, 1, 2].includes(octave)) {
    transposedFragments = transposeFragmentsInOctave(
      selectedFragments,
      randomTransposeDirection,
      octave as 0 | 1 | 2
    )
  }

  addUsedFragments(transposedFragments.map((f) => f.id))

  const TransPosedfragmentsWithdirection = transposedFragments.map((fragment) => {
    return { ...fragment, transpose: randomTransposeDirection }
  })

  return TransPosedfragmentsWithdirection as FragmentWithNotesAndTransposeDirection[]
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
      allLevelFragments: [] as FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
      fragmentsToShow: 0 as number,
      activeFragment: undefined as FragmentWithNotes | undefined,
      shownFragments: [] as FragmentWithNotesAndTransposeDirection[],
      guessedFragment: undefined as FragmentWithNotes | undefined,
      countdownTimings: undefined as CountdownTimings | undefined,
      countdownActions: undefined as StopwatchActions | undefined,
      latency: undefined as Latency | undefined,
      amountOfScenes: 0 as number,
      amountPlayed: 0 as number,
      fragmentGroups: [] as FragmentGroup[],
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
            levelFragments: FragmentWithNotes[]
            fragmentsToShow: number
            countdownTimings: CountdownTimings
            amountOfScenes: number
            countdownActions: StopwatchActions
            fragmentGroups: FragmentGroup[]
          },
    },
    tsTypes: {} as import('./testMachine.typegen').Typegen0,
    states: {
      idle: {
        description: 'The state where the context data will be initialized',
        on: {
          STARTROUND: {
            target: 'answeringQuestions',
            actions: 'setupData',
          },
        },
      },
      answeringQuestions: {
        description: 'The state where the user is answering the questions for the test',
        on: {
          ANSWEREDQUESTIONS: {
            target: 'startRound',
            actions: 'startPlaying',
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
              latency: () => ({ startTime: Date.now(), endTime: 0, latency: 0 }),
            }),
            description: 'In this state the user can guess the heard fragment',
            on: {
              GUESSEDFRAGMENT: {
                target: 'restAfterAnswering',
                actions: ['setGuessedFragment', 'saveLatency'],
              },
            },
            after: {
              10000: {
                target: 'didNotAnswerFragment',
                actions: 'timedOutAnswering',
              },
            },
          },
          didNotAnswerFragment: {
            after: {
              3000: 'restAfterAnswering',
            },
          },
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
      timedOutAnswering: assign((context, event) => {
        const { setChosenFragmentLatency, setChosenFragment, addNewUserSceneAnswer } =
          useLuisterenStore.getState()
        context.countdownActions?.pause()
        addNewUserSceneAnswer(undefined)
        setChosenFragment(undefined)
        if (context.latency) {
          setChosenFragmentLatency(-1)
        }
        return {
          guessedFragment: undefined,
        }
      }),
      setupData: assign((_, event) => {
        const { setUsedFragments } = useLuisterenStore.getState()
        setUsedFragments(new Array(event.levelFragments.length).fill(0))
        return {
          allLevelFragments: event.levelFragments,
          fragmentsToShow: event.fragmentsToShow,
          amountOfScenes: event.amountOfScenes,
          countdownTimings: event.countdownTimings,
          countdownActions: event.countdownActions,
          fragmentGroups: event.fragmentGroups,
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
          shownFragments: [],
        }
      }),
      onCountdownStarted: assign((context) => {
        const { setPlayedFragmentId } = useLuisterenStore.getState()
        const transposedFragments = Transpose(
          context.allLevelFragments,
          context.fragmentsToShow,
          context.amountPlayed,
          context.amountOfScenes
        )

        const newActiveFragment =
          transposedFragments?.[Math.floor(Math.random() * transposedFragments.length)]
        setPlayedFragmentId(newActiveFragment?.id ?? 0)
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
  }
)
