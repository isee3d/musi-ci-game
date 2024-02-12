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

const FragmentPlayerRenderer: React.FC = () => {
  const { data: session } = useSession()

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
    getFormattedStoreData,
    resetSceneRelatedData,
    setSceneStartTime,
  } = useLuisterenStore()

  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation()

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
        <Button
          size={'lg'}
          onClick={() => {
            // The last shown scene if Played should also be saved...
            if (listenToFragmentsState) {
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
            setEndTime(Date.now())
            addScene(sceneData)
            // console.log('scenedata: ', sceneData)
            // console.log('allplayedscenes: ', allPlayedScenes)
            resetSceneRelatedData()
            saveToDB(getFormattedStoreData(session?.user.id))
            send('FINISHEDPLAYING')
          }}
        >
          Stop
        </Button>
      </div>
    </>
  )
}

export default FragmentPlayerRenderer
