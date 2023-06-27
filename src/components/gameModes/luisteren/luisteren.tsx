import React, { useEffect, useRef } from 'react'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import BackToOverView from '~/components/gameModes/luisteren/backToOverView'
import PlayButtonsRenderer from '~/components/gameModes/luisteren/playButtonsRenderer'
import LuisterenFeedback from '~/components/gameModes/luisteren/luisterenFeedback'
import LuisterenfragmentPlayerRenderer from '~/components/gameModes/luisteren/luisterenfragmentPlayerRenderer'
import { LuisterenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { GameMode } from '@prisma/client'

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
  const { send } = LuisterenMachineContext.useActorRef()
  const isPlayingState = LuisterenMachineContext.useSelector((state) => state.matches('playing'))
  const isfinishedPlayingState = LuisterenMachineContext.useSelector((state) =>
    state.matches('finishedListening')
  )
  const { setStartTime, setLevelSublevelMode, reset } = useLuisterenStore()

  useEffect(() => {
    reset()
    setStartTime(Date.now())
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
    })
  }, [])

  return (
    <>
      <h2 className="text-center text-4xl font-extrabold tracking-tight">Kijk en luister</h2>
      {isPlayingState && <LuisterenfragmentPlayerRenderer />}
      {isfinishedPlayingState && <LuisterenFeedback />}
      <div className=" flex justify-center space-x-5">
        {isPlayingState && <PlayButtonsRenderer />}
        {isfinishedPlayingState && <BackToOverView levelId={levelId} sublevelId={sublevelId} />}
      </div>
    </>
  )
}

export default Luisteren
