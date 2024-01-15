import { baseNotes, pianoNotesMap } from '~/components/fragmentPlayer/audio/Keyboard';
import { FragmentGroup } from "types/fragmentGroup"
import { FragmentWithNotes, FragmentWithNotesAndTransposeDirection, FragmentWithNotesAndWeight, FragmentWithNotesWeightAndTransposeDirection } from "~/components/fragmentPlayer/audio/fragmentWithNotes"

export const getOriginalFragments = (
  shownFragments: FragmentWithNotesAndTransposeDirection[],
  allLevelFragments: (FragmentWithNotesAndTransposeDirection | FragmentWithNotes)[],
): FragmentWithNotes[] => {
  const shownFragmentIds = shownFragments.map((frag) => frag.id)

  const originalFragments = allLevelFragments.filter((frag) =>
    shownFragmentIds.includes(frag.id),
  ) as FragmentWithNotes[]

  // console.log('originalFragments', originalFragments, 'shown: ', shownFragments)
  return originalFragments
}

export const getOriginalFragmentsFromFragmentGroup = (
  shownFragments: FragmentWithNotesAndWeight[],
  originalFragmentGroups: FragmentGroup[] | undefined,
): FragmentWithNotes[] => {
  if (!originalFragmentGroups) return []
  const shownFragmentIds = new Set(shownFragments.map((frag) => frag.id))

  let originalFragments: FragmentWithNotes[] = []

  originalFragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment) => {
      if (shownFragmentIds.has(fragment.id)) {
        originalFragments.push(fragment)
      }
    })
  })

  return originalFragments
}

// export const getOriginalFragmentsFromFragmentGroup = (
//   shownFragments: FragmentWithNotesAndWeight[],
//   originalFragmentGroups: FragmentGroup[] | undefined,
// ): FragmentWithNotes[] => {
//   if (!originalFragmentGroups) return []
//   const shownFragmentIds = shownFragments.map((frag) => frag.id)

//   return originalFragmentGroups.filter((frag) =>
//     shownFragmentIds.includes(frag.id),
//   ) as FragmentWithNotes[]
// }

export const getShownFragmentByFragmentId = (
  shownFragments: FragmentWithNotesAndWeight[],
  fragmentId: number,
): FragmentWithNotes | undefined => {
  return shownFragments.find((frag) => frag.id === fragmentId)
}

export function canTranspose(fragment: FragmentWithNotes, direction: number) {
  const minNote = Math.min(
    ...fragment.notes.map((n) => baseNotes.findIndex((no) => no === n.name.replace(/\d/, ''))),
  )
  const maxNote = Math.max(
    ...fragment.notes.map((n) => baseNotes.findIndex((no) => no === n.name.replace(/\d/, ''))),
  )
  return !(minNote + direction < 0 || maxNote + direction >= 12)
}

export function adjustWeights(
  fragments: FragmentWithNotesAndWeight[],
  selectedFragment: FragmentWithNotesAndWeight,
) {
  const decreaseAmount = 5
  const increaseAmount = 10

  fragments.forEach((fragment) => {
    if (fragment.id === selectedFragment.id) {
      fragment.weight = Math.max(fragment.weight - decreaseAmount, 0)
    } else {
      fragment.weight += increaseAmount
    }
  })
}

export function adjustSingleItemWeight(
  fragment: FragmentWithNotesAndWeight | undefined,
) {
  const decreaseAmount = 5
  if(!fragment) return fragment
  fragment.weight = Math.max(fragment.weight - decreaseAmount, 0)
  return fragment
}

export function getNoteIndex(note: string) {
  return pianoNotesMap.get(note) ?? 0
}

export function getNoteNameFromNoteIndex(index: number) {
  for (let [key, value] of pianoNotesMap) {
    if (value === index) {
      return key
    }
  }
  return '-1'
}
