import React, { useEffect, useRef } from 'react'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import BackToOverView from '~/components/gameModes/luisteren/backToOverView'
import PlayButtonsRenderer from '~/components/gameModes/luisteren/playButtonsRenderer'
import LuisterenFeedback from '~/components/gameModes/luisteren/luisterenFeedback'
import LuisterenfragmentPlayerRenderer from '~/components/gameModes/luisteren/luisterenfragmentPlayerRenderer'
import { LuisterenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { GameMode } from '@prisma/client'
import { Button, buttonVariants } from '~/components/ui/button'
import { useRouter } from 'next/router'
import { cn } from '~/lib/utils'

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
  const { send } = LuisterenMachineContext.useActorRef()
  const isIdleState = LuisterenMachineContext.useSelector((state) => state.matches('idle'))
  const isPlayingState = LuisterenMachineContext.useSelector((state) => state.matches('playing'))
  const isfinishedPlayingState = LuisterenMachineContext.useSelector((state) =>
    state.matches('finishedListening'),
  )
  const { setStartTime, setLevelSublevelMode, reset } = useLuisterenStore()

  useEffect(() => {
    return () => {
      send({ type: 'EXITGAME' })
    }
  }, [])

  function restartLuisteren() {
    send({
      type: 'RESTARTMACHINE'
    })
    startLuisteren()
  }

  function startLuisteren() {
    reset()
    setStartTime(Date.now())
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
    })
  }

  return (
    <>
      <h2 className="text-center text-4xl font-extrabold tracking-tight">Klik en luister</h2>
      {isIdleState && (
        <div className="flex flex-col gap-y-5">
          <Button className={buttonVariants({ size: 'lg' })} onClick={() => startLuisteren()}>
            Start met luisteren
          </Button>
          <Button className={buttonVariants({ size: 'lg' })} onClick={() => router.back()}>
            Terug
          </Button>
        </div>
      )}
      {isPlayingState && <LuisterenfragmentPlayerRenderer />}
      {isfinishedPlayingState && <LuisterenFeedback />}
      <div className=" flex justify-center space-x-5">
        {isPlayingState && <PlayButtonsRenderer />}
        {isfinishedPlayingState && (
          <Button
            className={cn(buttonVariants({ size: 'lg' }), 'bg-purple-500 text-white hover:bg-purple-300')}
            onClick={() => restartLuisteren()}
          >
            Speel opnieuw
          </Button>
        )}
        {isfinishedPlayingState && <BackToOverView levelId={levelId} />}
      </div>
    </>
  )
}

export default Luisteren
