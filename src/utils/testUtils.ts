import {
  FragmentWithNotes
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { log } from '~/components/gameModes/testMode/test'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

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
