import React, { useEffect, useMemo } from 'react'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import CountdownPlayer from '~/components/gameModes/spelen/countdownPlayer'
import FragmentPlayerRenderer from '~/components/gameModes/spelen/fragmentPlayerRenderer'
import StartRoundUI from '~/components/gameModes/spelen/startRoundUI'

import { GameMode } from '@prisma/client'
import { CountdownTimings } from 'types/Timings'
import SpelenFeedback from '~/components/gameModes/spelen/spelenFeedback'
import { SpelenMachineContext } from '~/components/gameModes/spelen/spelenMachine'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

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
  const { setStartTime, setLevelSublevelMode, reset, setIsPlaying } = useLuisterenStore()
  const countdownState = SpelenMachineContext.useSelector((state) => state.matches('countdown'))
  const playingState = SpelenMachineContext.useSelector((state) => state.matches('playing'))
  const isIdleState = SpelenMachineContext.useSelector((state) => state.matches('idle'))
  const finishedState = SpelenMachineContext.useSelector((state) =>
    state.matches('FinishedPlayingSpelenMode'),
  )

  const countdownTimings: CountdownTimings = useMemo(
    () => ({
      one: mode?.one ?? 1000,
      two: mode?.two ?? 1000,
      three: mode?.three ?? 1000,
      go: mode?.go ?? 1000,
    }),
    [mode],
  )

  useEffect(() => {
    return () => {
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      send({ type: 'EXITGAME' })
    }
  }, [])

  function restartSpelen() {
    send({
      type: 'RESTARTMACHINE',
    })
  }

  function startSpelen() {
    setStartTime(Date.now())
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
      countdownTimings: countdownTimings,
    })
  }

  return (
    <>
      {!finishedState && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Luister en klik
        </h2>
      )}
      {isIdleState && <StartRoundUI startSpelen={startSpelen} />}
      {countdownState && <CountdownPlayer />}
      {(playingState || countdownState) && <FragmentPlayerRenderer sublevelId={sublevelId} />}
      {finishedState && <SpelenFeedback path={{ gameId, levelId, restartSpelen }} />}
    </>
  )
}

export default Spelen
