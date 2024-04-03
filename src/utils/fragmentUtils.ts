import { FragmentGroup } from 'types/fragmentGroup'
import { baseNotes, pianoNotesMap } from '~/components/fragmentPlayer/audio/Keyboard'
import {
  FragmentWithNotes,
  FragmentWithNotesAndWeight,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'

export const getOriginalFragments = (
  shownFragments: FragmentWithNotesAndWeight[] | FragmentWithNotes[],
  allLevelFragments: FragmentWithNotesAndWeight[] | FragmentWithNotes[],
) => {
  const shownFragmentIds = shownFragments.map((frag) => frag.id)

  const originalFragments = allLevelFragments.filter((frag) => shownFragmentIds.includes(frag.id))

  return originalFragments
}

export const getOriginalFragmentsFromFragmentGroup = (
  shownFragments: FragmentWithNotesAndWeight[],
  originalFragmentGroups: FragmentGroup[] | undefined,
): FragmentWithNotes[] => {
  if (!originalFragmentGroups) return []

  let originalFragments: FragmentWithNotes[] = []

  const originalFragmentsMap = new Map<number, FragmentWithNotes>()

  originalFragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment) => {
      originalFragmentsMap.set(fragment.id, fragment)
    })
  })

  shownFragments.forEach((shownFragment) => {
    const originalFragment = originalFragmentsMap.get(shownFragment.id)
    if (originalFragment) {
      originalFragments.push(originalFragment)
    }
  })

  return originalFragments
}

export const getShownFragmentByFragmentId = (
  shownFragments: FragmentWithNotesAndWeight[] | FragmentWithNotes[],
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
  fragmentsToShow?: number,
  gameMode?: string
) {
  let decreaseAmount = 15;
  let increaseAmount = 15;
  let decreaseAmountForUseAlways = 15;
  let increaseAmountForUseAlways = 10;

  if(gameMode === 'test' && fragmentsToShow === 2) {
    decreaseAmount = 15;
    increaseAmount = 15;
    decreaseAmountForUseAlways = 15;
    increaseAmountForUseAlways = 60;
  } else if(gameMode === 'test' && fragmentsToShow && fragmentsToShow > 2) {
    decreaseAmount = 25;
    increaseAmount = 25;
    decreaseAmountForUseAlways = 5;
    increaseAmountForUseAlways = 5;
  }

  fragments.forEach((fragment) => {
    if (fragment.id === selectedFragment.id) {
      const decrease = fragment.useAlways ? decreaseAmountForUseAlways : decreaseAmount
      fragment.weight = Math.max(fragment.weight - decrease, 0)
      // console.log('fragment.weight and name', fragment.weight, fragment.name)
    } else {
      const increase = fragment.useAlways ? increaseAmountForUseAlways : increaseAmount
      fragment.weight += increase
    }
  })
}

export function adjustSingleItemWeight(fragment: FragmentWithNotesAndWeight | undefined) {
  const decreaseAmount = 5
  if (!fragment) return fragment
  fragment.weight = Math.max(fragment.weight - decreaseAmount, 0)
  return fragment
}

export function getNoteIndex(note: string) {
  return pianoNotesMap.get(note)
}

export function getNoteNameFromNoteIndex(index: number) {
  for (let [key, value] of pianoNotesMap) {
    if (value.noteNumber === index) {
      return key
    }
  }
  return '-1'
}
