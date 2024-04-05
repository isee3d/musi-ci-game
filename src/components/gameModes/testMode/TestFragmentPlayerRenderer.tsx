import React, { useEffect, useState } from 'react'
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { shallowEqual } from '@xstate/react'
import { FragmentSceneData } from 'types/SceneData'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { toast } from 'sonner'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'
import { GameMode } from '@prisma/client'
import {
  getOriginalFragments,
  getOriginalFragmentsFromFragmentGroup,
  getShownFragmentByFragmentId,
} from '~/utils/fragmentUtils'
// import Test from '~/components/gameModes/testMode/test'

interface TestFragmentPlayerRendererProps {
  mode: GameMode | null | undefined
}

const TestFragmentPlayerRenderer: React.FC<TestFragmentPlayerRendererProps> = ({ mode }) => {
  const { data: session } = useSession()
  if (!session) return null

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
  const allOriginalFragments = TestModeMachineContext.useSelector(
    (state) => state.context.originalFragments,
  )
  const sublevelName = TestModeMachineContext.useSelector((state) => state.context.sublevelName)
  // const originalFragmentGroups = TestModeMachineContext.useSelector(
  //   (state) => state.context.originalFragmentGroups,
  // )
  const guessHeardFragmentState = TestModeMachineContext.useSelector((state) =>
    state.matches('playing.guessHeardFragment'),
  )
  const restAfterPlayingState = TestModeMachineContext.useSelector((state) =>
    state.matches('playing.restAfterAnswering'),
  )
  const amountPlayed = TestModeMachineContext.useSelector((state) => state.context.amountPlayed)

  const {
    addNewUserSceneAnswer,
    AddSceneData,
    setEndTime,
    setChosenFragment,
    getFormattedStoreData,
    setSceneStartTime,
    TestOneArray,
    TestTwoArray,
  } = useLuisterenStore()

  const [originalFragments, setOriginalFragments] = useState<FragmentWithNotes[]>([])

  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation()

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
    // setOriginalFragments(
    //   getOriginalFragmentsFromFragmentGroup(shownFragments, originalFragmentGroups),
    // )

    // if (mode?.amountOfScenes === null) {
    //   toast.error('Het aantal scenes is niet gespecificeerd for deze game mode')
    // }

    // if (amountPlayed === test_1.length - 1) {
    //   setEndTime(Date.now())
    //   saveToDB(getFormattedStoreData(session?.user.id))
    //   send('FINISHEDPLAYING')
    // }
  }, [shownFragments])

  function checkIsAnimating(fragment: FragmentWithNotes) {
    return isAnimating ?? false
  }

  function checkIsClickable() {
    return isClickable
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
      addNewUserSceneAnswer(checkIsGuessedCorrect(fragmentToPlay))
      setChosenFragment(fragmentToPlay.id)
      send({ type: 'GUESSEDFRAGMENT', guessedFragment: fragmentToPlay })
    }
  }

  function onFragmentPlayingComplete() {
    // setactiveFragmentPlayerIndex(undefined)
  }

  useEffect(() => {
    console.log(sublevelName === 'TEST, level 1')
    if (restAfterPlayingState) {
      console.log('coming here')
      if (sublevelName === 'TEST, level 1') {
        if (TestOneArray?.length === 0) {
          setEndTime(Date.now())
          saveToDB(getFormattedStoreData(session?.user.id))
          send('FINISHEDPLAYING')
        }
      } else if (sublevelName === 'TEST, level 2') {
        if (TestTwoArray?.length === 0) {
          setEndTime(Date.now())
          saveToDB(getFormattedStoreData(session?.user.id))
          send('FINISHEDPLAYING')
        }
      }
    }
  }, [restAfterPlayingState])

  return (
    <>
      <h3 className="pb-4 text-xl font-bold tracking-tight lg:text-4xl">
        Klik op het gehoorde fragment
      </h3>
      {originalFragments.map((fragment) => (
        <AnimationPlayer
          key={fragment.id}
          animationFragment={fragment}
          options={{
            useBlueBorderCLick: true,
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
