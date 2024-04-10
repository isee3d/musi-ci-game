import { FragmentGroupWithWeights } from 'types/fragmentGroup'
import {
  FragmentWithNotes,
  FragmentWithNotesAndWeight,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { log } from '~/components/gameModes/testMode/test'
import { test_1, test_2 } from '~/components/gameModes/testMode/testJsonData'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { deepCopy } from '~/utils/deepCopy'

/*
 EXPLANATION OF TEST ALGORITHM

 1) Get the least used fragments for the scene randomly if evenly used and make sure fragment going up first
 2) Get all potential fragments that haven't been used more than the threshold (amountOfScenes / totalFragmentCount)
    and adjust threshold for always used fragments
 3) Do a deep copy of the of all Fragments (fragmentGroups)
 4) get the new active fragment by letting the potential fragments be thrown into the weighted choose function
 5) Replace the weight adjusted fragments in the deep copied fragmentgroups variable
 6) filter the playable octaves for the chosen active fragment
 7) choose a random octave from the playable octaves
 8) Transpose all fragments weighted to the new octave
 9) Store the played fragment in the usedFragmentsMap
 10) Return the data
*/

// #region Test Util Types
interface FilterLeastUsedFragmentOptions {
  fragmentGroups: FragmentGroupWithWeights[]
  fragmentsToShowSize: number
  pianoNotesMap: Map<string, { noteNumber: number; weight: number }>
  usedFragmentsMap: {
    [fragmentId: number]: {
      [octaveNumber: number]: number
    }
  }
}

interface FilterPlayableFragmentOptions {
  sceneFragments: FragmentWithNotesAndWeight[]
  fragmentGroups: FragmentGroupWithWeights[]
  fragmentsToShow: number
  amountOfScenes: number
  usedFragmentsMap: {
    [fragmentId: number]: {
      [octaveNumber: number]: number
    }
  }
}

interface GetPlayableOctavesForFragmentOptions {
  newActiveFragment: FragmentWithNotesAndWeight
  availableOctaves: number[]
  amountOfScenes: number
  newUsedFragmentsMap: {
    [fragmentId: number]: {
      [octaveNumber: number]: number
    }
  }
  fragmentGroups: FragmentGroupWithWeights[]
  fragmentsToShow: number
}
// #endregion

function filterFragmentsWithUseAlways(fragmentGroups: FragmentGroupWithWeights[]) {
  const filteredFragments: FragmentWithNotesAndWeight[] = []

  fragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment) => {
      if (fragment.useAlways === true) {
        filteredFragments.push(fragment)
      }
    })
  })

  return filteredFragments
}

function getFilteredLeastUsedFragments(options: FilterLeastUsedFragmentOptions) {
  const { fragmentGroups, fragmentsToShowSize, usedFragmentsMap, pianoNotesMap } = options
  const alwaysUsedFragments = filterFragmentsWithUseAlways(fragmentGroups)

  // Logic for showing more than 2 fragments
  if (fragmentsToShowSize > 2) {
    let leastUsedFragments: FragmentWithNotesAndWeight[] = []
    let minUsageCount = Number.MAX_VALUE

    // Find all least used fragments
    fragmentGroups.forEach((group) => {
      group.fragments.forEach((fragment) => {
        if (fragment.useAlways) return

        const totalUsageCount = Object.values(usedFragmentsMap[fragment.id] || {}).reduce(
          (sum, count) => sum + count,
          0,
        )

        if (totalUsageCount < minUsageCount) {
          minUsageCount = totalUsageCount
          leastUsedFragments = [fragment]
        } else if (totalUsageCount === minUsageCount) {
          leastUsedFragments.push(fragment)
        }
      })
    })

    // Randomly select one of the least used fragments
    let selectedFragment: FragmentWithNotesAndWeight | undefined = undefined
    if (leastUsedFragments.length > 0) {
      const randomIndex = Math.floor(Math.random() * leastUsedFragments.length)
      selectedFragment = leastUsedFragments[randomIndex]
    }

    // Find the group of the selected fragment and filter out useAlways if specified
    let selectedGroupFragments: FragmentWithNotesAndWeight[] = []
    if (selectedFragment) {
      const selectedGroup = fragmentGroups.find((group) =>
        group.fragments.some((frag) => frag.id === selectedFragment?.id),
      )
      if (selectedGroup) {
        selectedGroupFragments = selectedGroup.fragments.filter(
          (fragment) => !fragment.useAlways || fragment.id === selectedFragment?.id,
        )
      }
    }

    // Sort the fragments in selectedGroupFragments on going up first

    selectedGroupFragments.sort((a, b) => {
      const aFirstNoteName = a.notes[0]?.name ?? ''
      const aSecondNoteName = a.notes[1]?.name ?? ''
      const bFirstNoteName = b.notes[0]?.name ?? ''
      const bSecondNoteName = b.notes[1]?.name ?? ''

      // Lookup the noteNumber for each note from the pianoNotesMap
      const aFirstNoteNumber = pianoNotesMap.get(aFirstNoteName)?.noteNumber ?? 0
      const aSecondNoteNumber = pianoNotesMap.get(aSecondNoteName)?.noteNumber ?? 0
      const bFirstNoteNumber = pianoNotesMap.get(bFirstNoteName)?.noteNumber ?? 0
      const bSecondNoteNumber = pianoNotesMap.get(bSecondNoteName)?.noteNumber ?? 0

      // Determine if each fragment is "going up"
      const aIsGoingUp = aSecondNoteNumber > aFirstNoteNumber
      const bIsGoingUp = bSecondNoteNumber > bFirstNoteNumber
      // Sort fragments that are "going up" first
      if (aIsGoingUp && !bIsGoingUp) {
        return -1 // a goes before b
      } else if (!aIsGoingUp && bIsGoingUp) {
        return 1 // b goes before a
      } else {
        // If both fragments are either going up or not, sort by the first note's index for consistency
        return aFirstNoteNumber - bFirstNoteNumber
      }
    })
    return [...alwaysUsedFragments, ...selectedGroupFragments]
  }

  // Logic for showing 2 fragments
  let fragmentsToShow = [...alwaysUsedFragments]

  fragmentGroups.forEach((group) => {
    if (group.fragments.every((frag) => frag.useAlways)) {
      return
    }

    let leastUsedFragments: FragmentWithNotesAndWeight[] = []
    let minUsageCount = Number.MAX_VALUE

    group.fragments.forEach((fragment) => {
      // Calculate the total usage across all octaves for this fragment
      const totalUsageCount = Object.values(usedFragmentsMap[fragment.id] || {}).reduce(
        (sum, count) => sum + count,
        0,
      )

      if (totalUsageCount < minUsageCount) {
        minUsageCount = totalUsageCount
        leastUsedFragments = [fragment]
      } else if (totalUsageCount === minUsageCount) {
        leastUsedFragments.push(fragment)
      }
    })

    if (leastUsedFragments.length) {
      // Randomly select a fragment from the least used fragments
      const randomIndex = Math.floor(Math.random() * leastUsedFragments.length)
      const randomLeastUsedFragment = leastUsedFragments[randomIndex]
      if (randomLeastUsedFragment) {
        fragmentsToShow.push(randomLeastUsedFragment)
      }
    }
  })
  return fragmentsToShow.slice(0, fragmentsToShowSize)
}

function getAmountOfFragmentsInTestmodeExtractedFromFragmentGroups(
  fragmentGroups: FragmentGroupWithWeights[],
) {
  const uniqueFragmentIds = new Set<number>()

  fragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment) => {
      uniqueFragmentIds.add(fragment.id)
    })
  })

  return uniqueFragmentIds.size
}

function filterPlayableFragments(options: FilterPlayableFragmentOptions) {
  const { sceneFragments, fragmentGroups, fragmentsToShow, amountOfScenes, usedFragmentsMap } =
    options

  const amountOfFragmentsForTest =
    getAmountOfFragmentsInTestmodeExtractedFromFragmentGroups(fragmentGroups)

  const useAlwaysFragmentsCount = sceneFragments.filter((f) => f.useAlways).length
  const nonUseAlwaysFragmentsCount = amountOfFragmentsForTest - useAlwaysFragmentsCount

  const thresholdPerUseAlwaysFragment = Math.ceil(amountOfScenes / fragmentsToShow)
  const thresholdForNonUseAlways = Math.ceil(
    (amountOfScenes - thresholdPerUseAlwaysFragment * useAlwaysFragmentsCount) /
      nonUseAlwaysFragmentsCount,
  )

  return sceneFragments.filter((fragment) => {
    const totalUsageCount = Object.values(usedFragmentsMap[fragment.id] || {}).reduce(
      (sum, count) => sum + count,
      0,
    )
    return fragment.useAlways
      ? totalUsageCount < thresholdPerUseAlwaysFragment
      : totalUsageCount < thresholdForNonUseAlways
  })
}

function getPlayableOctavesForFragment(options: GetPlayableOctavesForFragmentOptions) {
  /*
    EXPLANATION OF FILTER PLAYABLE FRAGMENTS

    There is a different calculation for the threshold between useAlways fragments and non-useAlways fragments.

    /////////////////////////////////////////////
    The threshold for useAlways fragments:

    const totalUseAlwaysFragmentsCount = (AmountOfScenes / FragmentsToShow * UseAlwaysFragmentsCount)

    const amountOfUseAlwaysCountPeroctave = totalUseAlwaysFragmentsCount / TotalFragmentsPerOctave

    /////////////////////////////////////////////
    The threshold for non-useAlways fragments:

    const amountOfNonUseAlwaysCountPerOctave = (AmountOfScenes - totalUseAlwaysFragmentsCount) / NonUseAlwaysFragmentsCount / TotalFragmentsPerOctave
    */

  const {
    newActiveFragment,
    availableOctaves,
    amountOfScenes,
    newUsedFragmentsMap,
    fragmentGroups,
    fragmentsToShow,
  } = options

  const totalFragmentCount =
    getAmountOfFragmentsInTestmodeExtractedFromFragmentGroups(fragmentGroups)

  const totalfragmentsWithoutUseAlways =
    totalFragmentCount - filterFragmentsWithUseAlways(fragmentGroups).length

  // Determine the threshold
  const totalFragmentsPerOctave = availableOctaves.length

  let threshold = 0
  const totalUseAlwaysFragmentsCount =
    (amountOfScenes / fragmentsToShow) * (totalFragmentCount - totalfragmentsWithoutUseAlways)

  if (newActiveFragment.useAlways) {
    threshold = Math.ceil(totalUseAlwaysFragmentsCount / totalFragmentsPerOctave)
  } else {
    threshold = Math.ceil(
      (amountOfScenes - totalUseAlwaysFragmentsCount) /
        totalfragmentsWithoutUseAlways /
        totalFragmentsPerOctave,
    )
  }

  // Get the usage map for the new active fragment
  const fragmentUsageMap = newUsedFragmentsMap[newActiveFragment.id] || {}
  // Filter out the octaves that have not exceeded the threshold
  const playableOctaves = availableOctaves.filter((octave) => {
    const usageCount = fragmentUsageMap[octave] || 0
    return usageCount < threshold
  })

  return playableOctaves
}

export const transpose = (
  fragmentsToShow: number,
  amountOfScenes: number,
  fragmentGroups: FragmentGroupWithWeights[],
  pianoNotesMap: Map<string, { noteNumber: number; weight: number }>,
) => {
  const { chooseWeightedActiveFragment, transposeWeightedFragments } =
    useAudioServiceStore.getState()
  const { newUsedFragmentsMap, addNewUsedFragment } = useLuisterenStore.getState()

  const leastUsedFragmentsForScene = getFilteredLeastUsedFragments({
    fragmentGroups: fragmentGroups,
    fragmentsToShowSize: fragmentsToShow,
    usedFragmentsMap: newUsedFragmentsMap,
    pianoNotesMap: pianoNotesMap,
  })

  const potentialActiveFragments = filterPlayableFragments({
    sceneFragments: leastUsedFragmentsForScene,
    fragmentGroups: fragmentGroups,
    fragmentsToShow: fragmentsToShow,
    amountOfScenes: amountOfScenes,
    usedFragmentsMap: newUsedFragmentsMap,
  })

  const weightAdjustedFragmentGroups = deepCopy(fragmentGroups)
  const newActiveFragment = chooseWeightedActiveFragment(
    potentialActiveFragments,
    fragmentsToShow,
    'test',
  )
  if (!newActiveFragment) throw new Error('No new active fragment available')

  weightAdjustedFragmentGroups.forEach((group) => {
    group.fragments.forEach((fragment, index) => {
      const potentialMatch = potentialActiveFragments.find(
        (potential) => potential.id === fragment.id,
      )
      if (potentialMatch) {
        group.fragments[index] = potentialMatch
      }
    })
  })

  const availableOctavesForNewActiveFragment = getPlayableOctavesForFragment({
    newActiveFragment: newActiveFragment,
    availableOctaves: [3, 4, 5],
    amountOfScenes: amountOfScenes,
    newUsedFragmentsMap: newUsedFragmentsMap,
    fragmentGroups: fragmentGroups,
    fragmentsToShow: fragmentsToShow,
  })

  const randomOctaveIndex = Math.floor(Math.random() * availableOctavesForNewActiveFragment.length)
  const randomOctave = availableOctavesForNewActiveFragment[randomOctaveIndex]

  const transposedFragments = transposeWeightedFragments(
    leastUsedFragmentsForScene,
    randomOctave ?? 0,
    [3, 4, 5],
    pianoNotesMap,
  )

  addNewUsedFragment(newActiveFragment.id, randomOctave ?? 0)
  return { transposedFragments, newActiveFragment, pianoNotesMap, weightAdjustedFragmentGroups }
}

// NEW UTILS FOR TESTMode

export function getFragmentById(fragmentId: number, fragments: FragmentWithNotes[]) {
  return fragments.find((fragment) => fragment.id === fragmentId)
}

function getFragmentByName({
  fragmentName,
  fragments,
}: {
  fragmentName: string
  fragments: FragmentWithNotes[]
}) {
  return fragments.find((fragment) => fragment.name === fragmentName)
}

export function transposeTestOne(fragments: FragmentWithNotes[]) {
  const { TestOneArray, removeItemFromTestOneArray } = useLuisterenStore.getState()
  if (!TestOneArray) throw new Error('TestOneArray not found')
  const nextTestItem = Math.floor(Math.random() * TestOneArray.length)
  const scene = TestOneArray[nextTestItem]
  const { transposeFragments } = useAudioServiceStore.getState()
  if (!scene) throw new Error(`Scene not found in test_1, ${nextTestItem}`)
  log.push(scene.scene)
  const newActiveFragment = getFragmentByName({
    fragmentName: scene.afspelen,
    fragments: fragments,
  })
  const fragmentOne = getFragmentByName({ fragmentName: scene.fragment_1, fragments: fragments })
  const fragmentTwo = getFragmentByName({ fragmentName: scene.fragment_2, fragments: fragments })
  if (!newActiveFragment || !fragmentOne || !fragmentTwo) {
    throw new Error('Fragment not found in fragments')
  }
  const allFragments = [fragmentOne, fragmentTwo]

  const transposedFragments = transposeFragments(allFragments, scene.octaaf, scene.grondtoon)
  removeItemFromTestOneArray(nextTestItem)
  return { transposedFragments, newActiveFragment }
}

export function transposeTestTwo(fragments: FragmentWithNotes[]) {
  const { TestTwoArray, removeItemFromTestTwoArray } = useLuisterenStore.getState()
  if (!TestTwoArray) throw new Error('TestOneArray not found')
  const nextTestItem = Math.floor(Math.random() * TestTwoArray.length)
  const scene = TestTwoArray[nextTestItem]
  if (!scene) throw new Error(`Scene not found in test_2, ${nextTestItem}`)
  log.push(scene.scene)
  const { transposeFragments } = useAudioServiceStore.getState()
  const newActiveFragment = getFragmentByName({
    fragmentName: scene.afspelen,
    fragments: fragments,
  })
  const fragmentOne = getFragmentByName({ fragmentName: scene.fragment_1, fragments: fragments })
  const fragmentTwo = getFragmentByName({ fragmentName: scene.fragment_2, fragments: fragments })
  const fragmentThree = getFragmentByName({ fragmentName: scene.fragment_3, fragments: fragments })
  if (!newActiveFragment || !fragmentOne || !fragmentTwo || !fragmentThree) {
    throw new Error('Fragment not found in fragments')
  }
  const allFragments = [fragmentOne, fragmentTwo, fragmentThree]

  const transposedFragments = transposeFragments(allFragments, scene.octaaf, scene.grondtoon)
  removeItemFromTestTwoArray(nextTestItem)
  return { transposedFragments, newActiveFragment }
}
