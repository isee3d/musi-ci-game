import React, { useEffect, useMemo } from 'react'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import StartRoundUI from '~/components/gameModes/spelen/startRoundUI'
import CountdownPlayer from '~/components/gameModes/spelen/countdownPlayer'
import FragmentPlayerRenderer from '~/components/gameModes/spelen/fragmentPlayerRenderer'
import { SpelenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import SpelenFeedback from '~/components/gameModes/spelen/spelenFeedback'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { CountdownTimings } from 'types/Timings'
import { GameMode } from '@prisma/client'

interface SpelenProps {
  fragments: FragmentWithNotes[]
  levelId: string
  gameId: string
  sublevelId: string
  fragmentsToShow: number
  mode: GameMode | null | undefined
}

const Spelen: React.FC<SpelenProps> = ({
  fragments,
  fragmentsToShow,
  sublevelId,
  levelId,
  gameId,
  mode,
}) => {
  const { send } = SpelenMachineContext.useActorRef()
  const { setStartTime, setLevelSublevelMode, reset } = useLuisterenStore()
  const startRoundState = SpelenMachineContext.useSelector((state) => state.matches('startRound'))
  const countdownState = SpelenMachineContext.useSelector((state) => state.matches('countdown'))
  const playingState = SpelenMachineContext.useSelector((state) => state.matches('playing'))
  const finishedState = SpelenMachineContext.useSelector((state) =>
    state.matches('FinishedPlayingSpelenMode')
  )

  const countdownTimings: CountdownTimings = useMemo(
    () => ({
      one: mode?.one ?? 1000,
      two: mode?.two ?? 1000,
      three: mode?.three ?? 1000,
      go: mode?.go ?? 1000,
    }),
    [mode]
  )

  useEffect(() => {
    reset()
    setStartTime(Date.now())
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
      countdownTimings: countdownTimings,
    })
  }, [])

  return (
    <>
      <h3 className="pb-16 text-center text-4xl font-extrabold tracking-tight">Kijk en luister</h3>
      {startRoundState && (
        <StartRoundUI gameId={gameId} levelId={levelId} sublevelId={sublevelId} />
      )}
      {countdownState && <CountdownPlayer />}
      {(playingState || countdownState) && <FragmentPlayerRenderer />}
      {finishedState && (
        <SpelenFeedback gameId={gameId} levelId={levelId} sublevelId={sublevelId} />
      )}
    </>
  )
}

export default Spelen
