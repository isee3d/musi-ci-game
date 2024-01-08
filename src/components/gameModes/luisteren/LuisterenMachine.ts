import { createMachine, assign } from 'xstate'
import {
  FragmentWithNotes,
  FragmentWithNotesAndTransposeDirection,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { deepCopy } from '~/utils/deepCopy'

const Transpose = (
  fragments: FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
  fragmentsToShow: number,
  shouldTranspose: boolean = true,
) => {
  const { transposeFragments } = useAudioServiceStore.getState()
  // const shuffledFragments = fragments.sort(() => Math.random() - 0.5);
  const alwaysUsedFragments = fragments.filter((f) => f.useAlways)
  const otherFragments = fragments.filter((f) => !f.useAlways)
  const amountToSelect = fragmentsToShow - alwaysUsedFragments.length
  const selectedOtherFragments = otherFragments.slice(0, amountToSelect)
  const selectedFragments = [...alwaysUsedFragments, ...selectedOtherFragments]
  if (!shouldTranspose) {
    return selectedFragments.map((fragment) => {
      return { ...fragment, transpose: 0, octave: 1 }
    }) as FragmentWithNotesAndTransposeDirection[]
  }

  const randomTransposeDirection = Math.floor(Math.random() * 12 - 0.0001) - 6
  console.log('randomTransposeDirection', randomTransposeDirection)
  // const randomTransposeDirection = -12
  const octaves = [3, 4, 5]
  const randomOctave = octaves[Math.floor(Math.random() * octaves.length)]
  const transposedFragments = transposeFragments(
    selectedFragments,
    randomTransposeDirection,
    // randomOctave,
  )
  const TransPosedfragmentsWithdirection = transposedFragments.map((fragment) => {
    return { ...fragment, transpose: randomTransposeDirection, octave: randomOctave }
  })

  return TransPosedfragmentsWithdirection as FragmentWithNotesAndTransposeDirection[]
}

export const luisterenMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'luisteren',
    initial: 'idle',
    context: {
      allLevelFragments: [] as FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
      fragmentsToShow: 0 as number,
      shownFragments: [] as FragmentWithNotesAndTransposeDirection[],
    },
    schema: {
      events: {} as
        | { type: 'STARTROUND'; levelFragments: FragmentWithNotes[]; fragmentsToShow: number }
        | { type: 'STARTPLAYING' }
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
        type: 'final',
      },
    },
    on: {
      SHUFFLEFRAGMENTS: {
        actions: 'shuffleFragments',
      },
    },
  },
  {
    actions: {
      setupData: assign((_, event) => {
        const { setIsPlaying } = useLuisterenStore.getState()
        setIsPlaying(true)
        return {
          allLevelFragments: event.levelFragments,
          fragmentsToShow: event.fragmentsToShow,
        }
      }),
      initializeShownFragments: assign((context) => {
        const copiedFragments = deepCopy(context.allLevelFragments)
        const transposedFragments = Transpose(copiedFragments, context.fragmentsToShow, false)
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
        const transposedFragments = Transpose(copiedFragments, context.fragmentsToShow)
        return {
          shownFragments: transposedFragments,
        }
      }),
    },
  },
)
