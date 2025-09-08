import React, { useEffect, useState } from 'react'
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'

import { shallowEqual } from '@xstate/react'
import { FragmentSceneData } from 'types/SceneData'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { toast } from 'sonner'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'
import { GameMode } from '@prisma/client'
import { getOriginalFragments, getShownFragmentByFragmentId } from '~/utils/fragmentUtils'
import { calculatePoints } from '~/utils/pointssystem'
import { UitdagingMachineContext } from '~/components/gameModes/uitdaging/uitdagingMachine'

interface UitdagingFragmentPlayerRendererProps {
  mode: GameMode | null | undefined
  sublevelId: string
}

const UitdagingFragmentPlayerRenderer: React.FC<UitdagingFragmentPlayerRendererProps> = ({
  mode,
  sublevelId,
}) => {
  const { data: session } = useSession()
  const { data: sublevel } = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  const { send } = UitdagingMachineContext.useActorRef()
  const isAnimating = UitdagingMachineContext.useSelector((state) => state.context.isAnimating)
  const isClickable = UitdagingMachineContext.useSelector((state) => state.context.isClickable)
  const activeFragment = UitdagingMachineContext.useSelector(
    (state) => state.context.activeFragment,
    shallowEqual,
  )
  const guessedFragment = UitdagingMachineContext.useSelector(
    (state) => state.context.guessedFragment,
    shallowEqual,
  )
  const playingSound = UitdagingMachineContext.useSelector((state) =>
    state.matches('playing.playSound'),
  )

  const shownFragments = UitdagingMachineContext.useSelector(
    (state) => state.context.shownFragments,
    shallowEqual,
  )
  const allOriginalFragments = UitdagingMachineContext.useSelector(
    (state) => state.context.allLevelFragments,
  )
  const restAfterClicking = UitdagingMachineContext.useSelector((state) =>
    state.matches('playing.restAfterAnswering'),
  )
  const guessHeardFragmentState = UitdagingMachineContext.useSelector((state) =>
    state.matches('playing.guessHeardFragment'),
  )
  const amountPlayed = UitdagingMachineContext.useSelector((state) => state.context.amountPlayed)

  const {
    addNewUserSceneAnswer,
    AddSceneData,
    setEndTime,
    setChosenFragment,
    getFormattedStoreData,
    setScore,
    setSceneStartTime,
    allPlayedScenes,
    startTime,
    getPercentageCorrectlyAnswered,
    getAmountOfCorrectAnswers,
  } = useLuisterenStore()

  const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(
    undefined,
  )
  const [originalFragments, setOriginalFragments] = useState<FragmentWithNotes[]>([])

  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation()
  const { mutate: saveScore } = api.levelResult.saveScore.useMutation({
    onSuccess: () => {
      send('FINISHEDPLAYING')
    },
  })

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

    if (mode?.amountOfScenes === null) {
      toast.error('Het aantal scenes is niet gespecificeerd for deze game mode')
    }

    console.log('amountPlayed', amountPlayed, 'mode?.amountOfScenes', mode?.amountOfScenes)
    if (amountPlayed === mode?.amountOfScenes) {
      setEndTime(Date.now())
      const { endTime } = useLuisterenStore.getState()
      setScore(
        calculatePoints({
          mFactor: sublevel?.mFactor,
          kFactor: sublevel?.kFactor,
          pFactor: sublevel?.pFactor,
          sFactor: sublevel?.sFactor,
          tFactor: sublevel?.tFactor,
          minutes: (endTime - startTime) / 60000,
          percentCorrect: getAmountOfCorrectAnswers(),
          scenes: amountPlayed,
          speed: averageChooseSpeed(),
        }),
      )
      saveToDB(getFormattedStoreData(session?.user.id ?? '1'))
      const { score } = useLuisterenStore.getState()
      saveScore({
        id_User: session?.user.id ?? '-1',
        score: score,
        id_sublevel: parseInt(sublevelId),
      })
    }
  }, [shownFragments])

  function averageChooseSpeed() {
    const allLatencies = allPlayedScenes
      .filter((scene) => typeof scene.chosenFragmentlatency === 'number')
      .map((scene) => scene.chosenFragmentlatency) as number[]

    const average =
      allLatencies.length > 0
        ? allLatencies.reduce((acc, cur) => acc + cur, 0) / allLatencies.length
        : 0
    return average
  }

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
    if (guessHeardFragmentState || playingSound) {
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
      {originalFragments.map((fragment) => (
        <AnimationPlayer
          key={fragment.id}
          animationFragment={fragment}
          options={{
            isClickable: checkIsClickable(),
            isAnimating: checkIsAnimating(fragment),
            showCorrectOutline: restAfterClicking,
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

export default UitdagingFragmentPlayerRenderer
