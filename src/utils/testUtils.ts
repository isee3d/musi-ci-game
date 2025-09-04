import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { log } from '~/components/gameModes/testMode/test'
import { TestScene } from '~/components/gameModes/testMode/testJsonData'
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

export function transposeTestN(testIndex: number, fragments: FragmentWithNotes[]) {
  function getFragment(fragmentName?: string) {
    if (!fragmentName) return
    return getFragmentByName({ fragmentName, fragments })
  }

  const key = `Test${testIndex}Array` as string
  const { [key]: testArray } = useLuisterenStore.getState() as unknown as Record<
    string,
    TestScene[]
  >
  if (!testArray) throw new Error(`${key} not found`)
  const { removeItemFromTestLevel } = useLuisterenStore.getState()
  const { transposeFragments } = useAudioServiceStore.getState()

  const nextTestItem = Math.floor(Math.random() * testArray.length)
  const scene = testArray[nextTestItem]

  if (!scene) throw new Error(`Scene not found in test_${testIndex}, ${nextTestItem}`)
  log.push(scene.scene)

  const allFragments = [
    getFragment(scene.fragment_1),
    getFragment(scene.fragment_2),
    getFragment(scene.fragment_3),
  ].filter(Boolean) as FragmentWithNotes[]

  const newActiveFragment = getFragmentByName({
    fragmentName: scene.afspelen,
    fragments: fragments,
  })

  if (!newActiveFragment) throw new Error(`no newActiveFragment`)

  const transposedFragments = transposeFragments(allFragments, scene.octaaf, scene.grondtoon)

  removeItemFromTestLevel(testIndex, nextTestItem)

  return { transposedFragments, newActiveFragment }
}

export function transposeTestOne(fragments: FragmentWithNotes[]) {
  const { Test1Array: TestOneArray, removeItemFromTestOneArray } = useLuisterenStore.getState()
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
  const { Test2Array: TestTwoArray, removeItemFromTestTwoArray } = useLuisterenStore.getState()
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
