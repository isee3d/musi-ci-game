import { createMachine, assign } from 'xstate'
import { pianoNotesMap } from '~/components/fragmentPlayer/audio/Keyboard'
import {
  FragmentWithNotes,
  FragmentWithNotesAndTransposeDirection,
  FragmentWithNotesAndWeight,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { deepCopy } from '~/utils/deepCopy'

const transpose = (
  fragments: FragmentWithNotesAndWeight[],
  fragmentsToShow: number,
  pianoNotesMap: Map<string, { noteNumber: number; weight: number }>,
  shouldTranspose: boolean = true,
) => {
  const { transposeWeightedFragments } = useAudioServiceStore.getState()
  const alwaysUsedFragments = fragments.filter((f) => f.useAlways)
  const otherFragments = fragments.filter((f) => !f.useAlways)

  const amountToSelect = fragmentsToShow - alwaysUsedFragments.length

  const selectedOtherFragments = otherFragments.slice(0, amountToSelect)
  const selectedFragments = [...alwaysUsedFragments, ...selectedOtherFragments]

  if (!shouldTranspose) {
    return selectedFragments
  }

  const octaves = [3, 4, 5]
  const randomOctave = octaves[Math.floor(Math.random() * octaves.length)]

  const transposedFragments = transposeWeightedFragments(
    selectedFragments,
    randomOctave ?? 3,
    octaves,
    pianoNotesMap,
  )

  return transposedFragments
}

export const luisterenMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'luisteren',
    initial: 'idle',
    context: {
      allLevelFragments: [] as FragmentWithNotesAndWeight[],
      fragmentsToShow: 0 as number,
      shownFragments: [] as FragmentWithNotesAndWeight[],
      pianoNotesMap: undefined as Map<string, { noteNumber: number; weight: number }> | undefined,
    },
    schema: {
      events: {} as
        | { type: 'STARTROUND'; levelFragments: FragmentWithNotes[]; fragmentsToShow: number }
        | { type: 'STARTPLAYING' }
        | { type: 'RESTARTMACHINE' }
        | { type: 'EXITGAME' }
        | { type: 'FINISHEDLISTENING' }
        | { type: 'SHUFFLEFRAGMENTS' },
    },
    tsTypes: {} as import('./LuisterenMachine.typegen').Typegen0,
    states: {
      idle: {
        description: 'The state where the context data will be initialized',
        on: {
          STARTROUND: { target: 'playing', actions: 'setupData' },
        },
      },
      playing: {
        entry: 'initializeShownFragments',
        description: 'The state where the user is listening to the fragments',
        on: {
          FINISHEDLISTENING: 'finishedListening',
        },
      },
      finishedListening: {
        entry: 'resetPlaying',
        description: 'The state where the user is done playing',
      },
      exitGame: {
        type: 'final',
      }
    },
    on: {
      SHUFFLEFRAGMENTS: {
        actions: 'shuffleFragments',
      },
      EXITGAME: {
        target: 'exitGame'
      },
      RESTARTMACHINE: {
        target: 'idle',
        actions: assign({
          allLevelFragments: [],
          fragmentsToShow:  0,
          shownFragments:  [],
          pianoNotesMap: undefined,
        }),
      },
    },
  },
  {
    actions: {
      setupData: assign((_, event) => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(true)
        const fragmentsWithWeight = event.levelFragments.map((fragment) => {
          return { ...fragment, weight: 100 }
        }) as FragmentWithNotesAndWeight[]

        return {
          allLevelFragments: fragmentsWithWeight,
          fragmentsToShow: event.fragmentsToShow,
          pianoNotesMap: pianoNotesMap,
        }
      }),
      initializeShownFragments: assign((context) => {
        const copiedFragments = deepCopy(context.allLevelFragments)
        const transposedFragments = transpose(
          copiedFragments,
          context.fragmentsToShow,
          context.pianoNotesMap ?? new Map(),
          false,
        )
        return {
          shownFragments: transposedFragments,
        }
      }),
      resetPlaying: assign((_, event) => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(false)
        return {}
      }),
      shuffleFragments: assign((context) => {
        const copiedFragments = deepCopy(context.allLevelFragments)
        const transposedFragments = transpose(
          copiedFragments,
          context.fragmentsToShow,
          context.pianoNotesMap ?? new Map(),
        )
        return {
          shownFragments: transposedFragments,
        }
      }),
    },
  },
)
