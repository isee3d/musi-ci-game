import React, { useEffect, useState } from 'react'
import { FragmentSceneData } from 'types/SceneData'
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer'
import { start } from '~/components/fragmentPlayer/audio/AudioControls'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { LuisterenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { getOriginalFragments, getShownFragmentByFragmentId } from '~/utils/fragmentUtils'

const LuisterenfragmentPlayerRenderer: React.FC = () => {
  const shownFragments = LuisterenMachineContext.useSelector(
    (state) => state.context.shownFragments,
  )

  const allOriginalFragments = LuisterenMachineContext.useSelector(
    (state) => state.context.allLevelFragments,
  )
  const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(
    undefined,
  )
  const { addScore, AddSceneData, addRelistenFragment, setSceneStartTime } = useLuisterenStore()
  const [originalFragments, setOriginalFragments] = useState<FragmentWithNotes[]>([])

  useEffect(() => {
    const sceneData: FragmentSceneData[] = []
    shownFragments.forEach((fragment, index) => {
      sceneData.push({
        id_fragment: fragment.id,
        fragmentIndex: index,
        groundTone: fragment.transpose ?? '',
        octave: fragment.octave ?? -1,
      })
    })
    AddSceneData(sceneData)
    setSceneStartTime(new Date())
    setOriginalFragments(getOriginalFragments(shownFragments, allOriginalFragments))

    return () => {
      const sceneData: FragmentSceneData[] = []
      shownFragments.forEach((fragment, index) => {
        sceneData.push({
          id_fragment: fragment.id,
          fragmentIndex: index,
          groundTone: fragment.transpose ?? '',
          octave: fragment.octave ?? -1,
        })
      })
      AddSceneData(sceneData)
    }
  }, [shownFragments])

  function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
    const fragmentToPlay = getShownFragmentByFragmentId(shownFragments, fragment.id)
    console.log('fragmentToPlay', fragmentToPlay)
    if (!fragmentToPlay) return
    setactiveFragmentPlayerIndex(fragmentToPlay.id)
    if (activeFragmentPlayerIndex === undefined) {
      start(fragmentToPlay)
      addScore(100)
      addRelistenFragment(fragmentToPlay.id)
    }
  }

  return (
    <>
      {originalFragments.map((fragment) => (
        <AnimationPlayer
          key={fragment.id}
          animationFragment={fragment}
          options={{
            isAnimating: activeFragmentPlayerIndex === fragment.id,
            isClickable: activeFragmentPlayerIndex === undefined,
            onAnimationClicked: onFragmentPlayerClicked,
            onAnimationComplete: () => setactiveFragmentPlayerIndex(undefined),
          }}
        />
      ))}
    </>
  )
}

export default LuisterenfragmentPlayerRenderer
