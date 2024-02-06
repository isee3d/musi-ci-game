import { FragmentGroup } from 'types/fragmentGroup'
import { baseNotes, pianoNotesMap } from '~/components/fragmentPlayer/audio/Keyboard'
import {
  FragmentWithNotes,
  FragmentWithNotesAndWeight,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'

export const getOriginalFragments = (
  shownFragments: FragmentWithNotesAndWeight[],
  allLevelFragments: FragmentWithNotesAndWeight[],
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
  const shownFragmentIds = new Set(shownFragments.map((frag) => frag.id))
  const addedFragmentIds = new Set<number>()
  let originalFragments: FragmentWithNotes[] = []

  originalFragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment) => {
      if (shownFragmentIds.has(fragment.id) && !addedFragmentIds.has(fragment.id)) {
        originalFragments.push(fragment)
        addedFragmentIds.add(fragment.id)
      }
    })
  })

  return originalFragments
}

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
  const decreaseAmount = 10
  const increaseAmount = 10

  fragments.forEach((fragment) => {
    if (fragment.id === selectedFragment.id) {
      fragment.weight = Math.max(fragment.weight - decreaseAmount, 0)
      console.log('fragment.weight and name', fragment.weight, fragment.name)
    } else {
      fragment.weight += increaseAmount
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
