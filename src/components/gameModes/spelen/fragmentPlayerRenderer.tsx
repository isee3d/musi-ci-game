import React, { useEffect, useState } from 'react'
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { start } from '~/components/fragmentPlayer/audio/AudioControls'
import { SpelenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { shallowEqual } from '@xstate/react'
import { FragmentSceneData } from 'types/SceneData'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

const FragmentPlayerRenderer: React.FC = () => {
  const { data: sessionData } = useSession()

  const { send } = SpelenMachineContext.useActorRef()
  const isAnimating = SpelenMachineContext.useSelector((state) => state.context.isAnimating)
  const isClickable = SpelenMachineContext.useSelector((state) => state.context.isClickable)

  const playingSound = SpelenMachineContext.useSelector((state) =>
    state.matches('playing.playSound')
  )

  const activeFragment = SpelenMachineContext.useSelector(
    (state) => state.context.activeFragment,
    shallowEqual
  )
  const guessedFragment = SpelenMachineContext.useSelector(
    (state) => state.context.guessedFragment,
    shallowEqual
  )
  const shownFragments = SpelenMachineContext.useSelector(
    (state) => state.context.shownFragments,
    shallowEqual
  )
  const guessHeardFragmentState = SpelenMachineContext.useSelector((state) =>
    state.matches('playing.guessHeardFragment')
  )
  const listenToFragmentsState = SpelenMachineContext.useSelector((state) =>
    state.matches('playing.listenToFragments')
  )

   if (!sessionData?.user) return null

  const {
    addNewUserSceneAnswer,
    AddSceneData,
    setEndTime,
    addRelistenFragment,
    setChosenFragment,
    addScene,
    sceneData,
    getFormattedStoreData,
  } = useLuisterenStore()

  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation({
    onSuccess: () => {
      toast.success('levelResult created!')
    },
    onError: () => {
      toast.error('Failed to upload new levelresult!')
    },
  })

  // local state
  const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(
    undefined
  )
  const [isPlayingFragment, setIsPlayingFragment] = useState(false)

  useEffect(() => {
    const sceneData: FragmentSceneData[] = []
    shownFragments.forEach((fragment, index) => {
      sceneData.push({
        id_fragment: fragment.id,
        fragmentIndex: index,
        groundTone: fragment.transpose,
      })
    })
    AddSceneData(sceneData)
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
    if (guessHeardFragmentState || playingSound) {
      if (activeFragmentPlayerIndex !== undefined) {
        setactiveFragmentPlayerIndex(undefined)
      }
      addNewUserSceneAnswer(checkIsGuessedCorrect(fragment))
      setChosenFragment(fragment.id)
      send({ type: 'GUESSEDFRAGMENT', guessedFragment: fragment })
      return
    }
    if (listenToFragmentsState) {
      setIsPlayingFragment(true)
      setactiveFragmentPlayerIndex(fragment.id)
      if (activeFragmentPlayerIndex === undefined) {
        start(fragment)
      }
      addRelistenFragment(fragment.id)
    }
  }

  function onFragmentPlayingComplete() {
    setIsPlayingFragment(false)
    setactiveFragmentPlayerIndex(undefined)
  }

  return (
    <>
      {shownFragments.map((fragment) => (
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
            send('FINISHEDLISTENING')
          }}
          className={cn(
            listenToFragmentsState && !isPlayingFragment
              ? 'cursor-pointer'
              : 'cursor-not-allowed bg-gray-400'
          )}
        >
          <h3>Volgende</h3>
        </Button>
        <Button
          size={'lg'}
          onClick={() => {
            setEndTime(Date.now())
            addScene(sceneData)
            send('FINISHEDPLAYING')
            saveToDB(getFormattedStoreData(sessionData?.user.id ?? '1'))

            // The last shown scene if Played should also be saved...
            if(listenToFragmentsState){
              const sceneData: FragmentSceneData[] = []
              shownFragments.forEach((fragment, index) => {
                sceneData.push({
                  id_fragment: fragment.id,
                  fragmentIndex: index,
                  groundTone: fragment.transpose,
                })
              })
              AddSceneData(sceneData)
            }
          }}
        >
          stoppen
        </Button>
      </div>
    </>
  )
}

export default FragmentPlayerRenderer
