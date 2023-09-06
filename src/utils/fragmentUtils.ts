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

  console.log('originalFragments', originalFragments, 'shown: ', shownFragments)
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
