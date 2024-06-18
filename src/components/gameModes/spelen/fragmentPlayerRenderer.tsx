import React, { useEffect, useState } from 'react'
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { start } from '~/components/fragmentPlayer/audio/AudioControls'
import { SpelenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { shallowEqual } from '@xstate/react'
import { FragmentSceneData } from 'types/SceneData'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { getOriginalFragments, getShownFragmentByFragmentId } from '~/utils/fragmentUtils'
import { calculatePoints } from '~/utils/pointssystem'

interface FragmentPlayerRendererProps {
  sublevelId: string
}

const FragmentPlayerRenderer: React.FC<FragmentPlayerRendererProps> = ({ sublevelId }) => {
  const { data: session } = useSession()
  const { data: sublevel } = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  const { send } = SpelenMachineContext.useActorRef()
  const isAnimating = SpelenMachineContext.useSelector((state) => state.context.isAnimating)
  const isClickable = SpelenMachineContext.useSelector((state) => state.context.isClickable)

  const playingSound = SpelenMachineContext.useSelector((state) =>
    state.matches('playing.playSound'),
  )

  const activeFragment = SpelenMachineContext.useSelector(
    (state) => state.context.activeFragment,
    shallowEqual,
  )
  const guessedFragment = SpelenMachineContext.useSelector(
    (state) => state.context.guessedFragment,
    shallowEqual,
  )
  const shownFragments = SpelenMachineContext.useSelector(
    (state) => state.context.shownFragments,
    shallowEqual,
  )
  const allOriginalFragments = SpelenMachineContext.useSelector(
    (state) => state.context.allLevelFragments,
  )
  const guessHeardFragmentState = SpelenMachineContext.useSelector((state) =>
    state.matches('playing.guessHeardFragment'),
  )
  const listenToFragmentsState = SpelenMachineContext.useSelector((state) =>
    state.matches('playing.listenToFragments'),
  )

  if (!session?.user) return null

  const {
    addNewUserSceneAnswer,
    AddSceneData,
    setEndTime,
    addRelistenFragment,
    setChosenFragment,
    addScene,
    sceneData,
    allPlayedScenes,
    luisterenClicks,
    startTime,
    setScore,
    getFormattedStoreData,
    getAmountOfCorrectAnswers,
    resetSceneRelatedData,
    setSceneStartTime,
    addLuisterenClick,
  } = useLuisterenStore()

  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation()
  const { mutate: saveScore } = api.levelResult.saveScore.useMutation({
    onSuccess: () => {
      send('FINISHEDPLAYING')
    },
  })

  // local state
  const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(
    undefined,
  )
  const [isPlayingFragment, setIsPlayingFragment] = useState(false)
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
    console.log('fragments:', shownFragments)
    setOriginalFragments(getOriginalFragments(shownFragments, allOriginalFragments))
    AddSceneData(sceneData)
    setSceneStartTime(new Date())
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
    if (guessHeardFragmentState || playingSound) {
      if (activeFragmentPlayerIndex !== undefined) {
        setactiveFragmentPlayerIndex(undefined)
      }
      addNewUserSceneAnswer(checkIsGuessedCorrect(fragmentToPlay))
      setChosenFragment(fragmentToPlay.id)
      send({ type: 'GUESSEDFRAGMENT', guessedFragment: fragmentToPlay })
      return
    }
    if (listenToFragmentsState) {
      addLuisterenClick()
      setIsPlayingFragment(true)
      setactiveFragmentPlayerIndex(fragmentToPlay.id)
      if (activeFragmentPlayerIndex === undefined) {
        start(fragmentToPlay)
      }
      addRelistenFragment(fragmentToPlay.id)
    }
  }

  function onFragmentPlayingComplete() {
    setIsPlayingFragment(false)
    setactiveFragmentPlayerIndex(undefined)
  }

  const onFinishedPlaying = () => {
    if (listenToFragmentsState) {
      const newSceneData: FragmentSceneData[] = []
      shownFragments.forEach((fragment, index) => {
        newSceneData.push({
          id_fragment: fragment.id,
          fragmentIndex: index,
          groundTone: fragment.transpose ?? '',
          octave: fragment.octave ?? -1,
        })
      })
      AddSceneData(newSceneData)
      const { sceneData } = useLuisterenStore.getState()
      addScene(sceneData)
    }
    setEndTime(Date.now())
    const { endTime, allPlayedScenes } = useLuisterenStore.getState()
    resetSceneRelatedData()
    if (allPlayedScenes.length > 0) {
      setScore(
        calculatePoints({
          mFactor: sublevel?.mFactor,
          kFactor: sublevel?.kFactor,
          pFactor: sublevel?.pFactor,
          sFactor: sublevel?.sFactor,
          minutes: (endTime - startTime) / 60000,
          percentCorrect: getAmountOfCorrectAnswers(),
          scenes: allPlayedScenes.length,
          clicks: luisterenClicks,
        }),
      )
      saveToDB(getFormattedStoreData(session?.user.id))
      const { score } = useLuisterenStore.getState()
      saveScore({ id_User: session.user.id, score: score, id_sublevel: parseInt(sublevelId) })
    } else {
      send('FINISHEDPLAYING')
    }
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
            showCorrectOutline: listenToFragmentsState,
            isCorrect: checkIsGuessedCorrect(fragment),
            guessedFragment: guessedFragment,
            // isLooping: true,
            onAnimationClicked: onFragmentPlayerClicked,
            onAnimationComplete: onFragmentPlayingComplete,
          }}
        />
      ))}
      <div className="flex justify-center space-x-12">
        <Button
          size={'lg'}
          disabled={!listenToFragmentsState || isPlayingFragment}
          onClick={() => {
            addScene(sceneData)
            resetSceneRelatedData()
            send('FINISHEDLISTENING')
          }}
          className={cn(
            listenToFragmentsState && !isPlayingFragment
              ? 'cursor-pointer'
              : 'cursor-not-allowed bg-gray-400',
          )}
        >
          <h3>Volgende</h3>
        </Button>
        <Button size={'lg'} onClick={() => onFinishedPlaying()}>
          Stop
        </Button>
      </div>
    </>
  )
}

export default FragmentPlayerRenderer
