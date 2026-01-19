import React, { useEffect, useRef } from 'react'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import BackToOverView from '~/components/gameModes/luisteren/backToOverView'
import PlayButtonsRenderer from '~/components/gameModes/luisteren/playButtonsRenderer'
import LuisterenFeedback from '~/components/gameModes/luisteren/luisterenFeedback'
import LuisterenfragmentPlayerRenderer from '~/components/gameModes/luisteren/luisterenfragmentPlayerRenderer'

import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { GameMode } from '@prisma/client'
import { Button, buttonVariants } from '~/components/ui/button'
import { useRouter } from 'next/router'
import { cn } from '~/lib/utils'
import { createActorContext } from '@xstate/react'
import { LuisterenMachineContext } from '~/components/gameModes/luisteren/LuisterenMachine'

interface LuisterenProps {
  fragmentsToShow: number
  fragments: FragmentWithNotes[]
  levelId: string
  sublevelId: string
  mode: GameMode | null | undefined
}

const Luisteren: React.FC<LuisterenProps> = ({
  fragments,
  fragmentsToShow,
  sublevelId,
  levelId,
  mode,
}) => {
  const router = useRouter()
  console.log('[Luisteren] Luisteren FC before send')
  const actorRef = LuisterenMachineContext.useActorRef()
  const { send } = actorRef ?? { send: () => {} }
  console.log('[Luisteren] Luisteren FC before selectors')
  let isIdleState = false
  let isPlayingState = false
  let isfinishedPlayingState = false

  isIdleState = LuisterenMachineContext.useSelector((state) => state.matches('idle'))
  isPlayingState = LuisterenMachineContext.useSelector((state) => {
    const res = state.matches('playing')
    return res
  })
  isfinishedPlayingState = LuisterenMachineContext.useSelector((state) =>
    state.matches('finishedListening'),
  )

  const { setStartTime, setLevelSublevelMode, reset, resetSceneRelatedData, setIsPlaying } =
    useLuisterenStore()

  useEffect(() => {
    return () => {
      setIsPlaying(false)
      send({ type: 'EXITGAME' })
    }
  }, [])

  function restartLuisteren() {
    reset()
    send({
      type: 'RESTARTMACHINE',
    })
    startLuisteren()
  }

  function startLuisteren() {
    console.log('[Luisteren] startLuisteren called')
    setIsPlaying(true)
    setStartTime(Date.now())
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
    })
  }

  console.log('[Luisteren] render complete')
  console.log({ isIdleState }, `showing Start / Terug ${isIdleState}`)
  console.log({ isPlayingState }, `showing PlayButtonsRenderer ${isPlayingState}`)

  if (!actorRef) {
    console.warn('[Luisteren] actorRef is not ready yet')
    return null
  }
  return (
    <>
      <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
        Klik en luister
      </h2>
      {isIdleState && (
        <div className="flex flex-col gap-y-5">
          <Button size={'lg'} onClick={() => startLuisteren()}>
            Start met luisteren
          </Button>
          <Button size={'lg'} onClick={() => router.back()}>
            Terug
          </Button>
        </div>
      )}
      {isPlayingState && <LuisterenfragmentPlayerRenderer />}
      {isfinishedPlayingState && <LuisterenFeedback levelId={levelId} />}
      {isPlayingState && <PlayButtonsRenderer sublevelId={sublevelId} />}
      {isfinishedPlayingState && (
        <Button
          className={cn(buttonVariants({ size: 'lg', variant: 'highlight' }))}
          onClick={() => restartLuisteren()}
        >
          Speel opnieuw
        </Button>
      )}
      {isfinishedPlayingState && <BackToOverView levelId={levelId} />}
    </>
  )
}

export default Luisteren
