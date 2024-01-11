import React, { useEffect, useState } from 'react'
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
// import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { shallowEqual } from '@xstate/react'
import { FragmentSceneData } from 'types/SceneData'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import toast from 'react-hot-toast'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'
import { GameMode } from '@prisma/client'
import { getOriginalFragments, getOriginalFragmentsFromFragmentGroup, getShownFragmentByFragmentId } from '~/utils/fragmentUtils'

interface TestFragmentPlayerRendererProps {
  mode: GameMode | null | undefined
}

const TestFragmentPlayerRenderer: React.FC<TestFragmentPlayerRendererProps> = ({ mode }) => {
  const { data: sessionData } = useSession()

  const { send } = TestModeMachineContext.useActorRef()
  const isAnimating = TestModeMachineContext.useSelector((state) => state.context.isAnimating)
  const isClickable = TestModeMachineContext.useSelector((state) => state.context.isClickable)
  const activeFragment = TestModeMachineContext.useSelector(
    (state) => state.context.activeFragment,
    shallowEqual,
  )
  const guessedFragment = TestModeMachineContext.useSelector(
    (state) => state.context.guessedFragment,
    shallowEqual,
  )
  const shownFragments = TestModeMachineContext.useSelector(
    (state) => state.context.shownFragments,
    shallowEqual,
  )
  const originalFragmentGroups = TestModeMachineContext.useSelector(
    (state) => state.context.originalFragmentGroups,
  )
  const guessHeardFragmentState = TestModeMachineContext.useSelector((state) =>
    state.matches('playing.guessHeardFragment'),
  )
  const amountPlayed = TestModeMachineContext.useSelector((state) => state.context.amountPlayed)

  const {
    addNewUserSceneAnswer,
    AddSceneData,
    setEndTime,
    setChosenFragment,
    getFormattedStoreData,
  } = useLuisterenStore()

  const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(
    undefined,
  )
  const [originalFragments, setOriginalFragments] = useState<FragmentWithNotes[]>([])

  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation({
    onSuccess: () => {
      toast.success('levelResult created!')
    },
    onError: () => {
      toast.error('Failed to upload new levelresult!')
    },
  })

  useEffect(() => {
    const sceneData: FragmentSceneData[] = []
    shownFragments.forEach((fragment, index) => {
      sceneData.push({
        id_fragment: fragment.id,
        fragmentIndex: index,
        groundTone: fragment.transpose ?? -1,
        octave: fragment.octave ?? -1,
      })
    })
    AddSceneData(sceneData)
    setOriginalFragments(getOriginalFragmentsFromFragmentGroup(shownFragments, originalFragmentGroups))

    if (mode?.amountOfScenes === null) {
      toast.error('Het aantal scenes is niet gespecificeerd for deze game mode')
    }

    if (amountPlayed === mode?.amountOfScenes) {
      setEndTime(Date.now())
      saveToDB(getFormattedStoreData(sessionData?.user.id ?? '1'))
      send('FINISHEDPLAYING')
    }
  }, [shownFragments])

  function checkIsAnimating(fragment: FragmentWithNotes) {
    return isAnimating === undefined ? activeFragmentPlayerIndex === fragment.id : isAnimating
  }

  function checkIsClickable() {
    return isClickable === undefined ? activeFragmentPlayerIndex === undefined : isClickable
  }

  function checkIsGuessedCorrect(selfFragment: FragmentWithNotes): boolean {
    if (selfFragment.id === activeFragment?.id) {
      // The clicked fragment is the active fragment
      return true
    }

    if (selfFragment.id === guessedFragment?.id) {
      // the clicked fragment is a wrong guess
      return false
    } else {
      // the clicked fragment has not been guessed yet
      return activeFragment ? false : true
    }
  }

  function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
    const fragmentToPlay = getShownFragmentByFragmentId(shownFragments, fragment.id)
    if (!fragmentToPlay) return
    if (guessHeardFragmentState) {
      if (activeFragmentPlayerIndex !== undefined) {
        setactiveFragmentPlayerIndex(undefined)
      }
      addNewUserSceneAnswer(checkIsGuessedCorrect(fragmentToPlay))
      setChosenFragment(fragmentToPlay.id)
      send({ type: 'GUESSEDFRAGMENT', guessedFragment: fragmentToPlay })
    }
  }

  function onFragmentPlayingComplete() {
    setactiveFragmentPlayerIndex(undefined)
  }

  return (
    <>
      <h3 className='text-4xl font-bold tracking-tight pb-4'>Klik op het gehoorde fragment</h3>
      {originalFragments.map((fragment) => (
        <AnimationPlayer
          key={fragment.id}
          animationFragment={fragment}
          options={{
            isClickable: checkIsClickable(),
            isAnimating: checkIsAnimating(fragment),
            showCorrectOutline: false,
            isCorrect: checkIsGuessedCorrect(fragment),
            // isLooping: true,
            onAnimationClicked: onFragmentPlayerClicked,
            onAnimationComplete: onFragmentPlayingComplete,
          }}
        />
      ))}
    </>
  )
}

export default TestFragmentPlayerRenderer
