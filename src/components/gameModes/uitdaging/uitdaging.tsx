import { GameMode } from '@prisma/client'
import React, { useEffect, useMemo } from 'react'
import { CountdownTimings } from 'types/Timings'
import { isNullish } from 'types/nullish'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import UitdagingFragmentPlayerRenderer from '~/components/gameModes/uitdaging/UitdagingfragmentPlayerRenderer'
import StartUitdagingUI from '~/components/gameModes/uitdaging/startUitdagingRoundUI'
import UitdagingCountdownPlayer from '~/components/gameModes/uitdaging/uitdagingCountdownPlayer'
import UitdagingFeedback from '~/components/gameModes/uitdaging/uitdagingFeedback'
import useStopwatch from '~/hooks/useStopwatch'
import { UitdagingMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface UitdagingProps {
  fragments: FragmentWithNotes[]
  levelId: string
  sublevelId: string
  gameId: string
  fragmentsToShow: number
  playTime: number | null | undefined
  mode: GameMode | null | undefined
}

const Uitdaging: React.FC<UitdagingProps> = ({
  fragments,
  gameId,
  levelId,
  sublevelId,
  fragmentsToShow,
  playTime,
  mode,
}) => {
  const { send } = UitdagingMachineContext.useActorRef()
  const idleState = UitdagingMachineContext.useSelector((state) => state.matches('idle'))
  const countdownState = UitdagingMachineContext.useSelector((state) => state.matches('countdown'))
  const playingState = UitdagingMachineContext.useSelector((state) => state.matches('playing'))
  const isFinishedState = UitdagingMachineContext.useSelector((state) =>
    state.matches('FinishedPlayingUitdagingMode'),
  )
  const stopwatch = useStopwatch(1000)

  const { setLevelSublevelMode, reset } = useLuisterenStore()

  const { hours, minutes, seconds } = stopwatch.convertedTime

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
      send({ type: 'EXITGAME' })
    }
  }, [])

  function restartUitdaging() {
    send({
      type: 'RESTARTMACHINE',
    })
  }

  function startUitdaging() {
    reset()
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
      countdownTimings: countdownTimings,
      countdownActions: stopwatch.actions,
    })
  }

  return (
    <>
      {idleState && (
        <>
          <h3 className=" text-center text-4xl font-extrabold tracking-tight">
            Speel tegen de klok
          </h3>
          <h3 className=" text-center text-4xl font-extrabold tracking-tight">
            Doe {mode?.amountOfScenes} opdrachten zo snel mogelijk
          </h3>
        </>
      )}
      {idleState && <StartUitdagingUI startUitdaging={startUitdaging} />}
      {(playingState || countdownState) && (
        <h3 className="text-center text-4xl font-extrabold tracking-tight">
          {hours}:{minutes}:{seconds}
        </h3>
      )}
      {countdownState && <UitdagingCountdownPlayer />}
      {(playingState || countdownState) && <UitdagingFragmentPlayerRenderer mode={mode} />}
      {isFinishedState && <UitdagingFeedback options={{ gameId, levelId, restartUitdaging }} />}
    </>
  )
}

export default Uitdaging
