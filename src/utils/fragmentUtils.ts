import { baseNotes } from '~/components/fragmentPlayer/audio/Keyboard';
import { FragmentGroup } from "types/fragmentGroup"
import { FragmentWithNotes, FragmentWithNotesAndTransposeDirection } from "~/components/fragmentPlayer/audio/fragmentWithNotes"

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
  shownFragments: FragmentWithNotesAndTransposeDirection[],
  fragmentGroupFragment: FragmentWithNotes[] | undefined,
): FragmentWithNotes[] => {
  if(!fragmentGroupFragment) return []
  const shownFragmentIds = shownFragments.map((frag) => frag.id)

  return fragmentGroupFragment.filter((frag) =>
    shownFragmentIds.includes(frag.id),
  ) as FragmentWithNotes[]
}

export const getShownFragmentByFragmentId = (
  shownFragments: FragmentWithNotesAndTransposeDirection[],
  fragmentId: number,
): FragmentWithNotes | undefined => {
  console.log('getShownFragmentByFragmentId', shownFragments, fragmentId)
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
