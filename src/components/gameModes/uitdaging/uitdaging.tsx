import { GameMode } from '@prisma/client'
import React, { useEffect, useMemo } from 'react'
import { CountdownTimings } from 'types/Timings'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import UitdagingFragmentPlayerRenderer from '~/components/gameModes/uitdaging/UitdagingfragmentPlayerRenderer'
import StartUitdagingUI from '~/components/gameModes/uitdaging/startUitdagingRoundUI'
import UitdagingCountdownPlayer from '~/components/gameModes/uitdaging/uitdagingCountdownPlayer'
import UitdagingFeedback from '~/components/gameModes/uitdaging/uitdagingFeedback'
import { UitdagingMachineContext } from '~/components/gameModes/uitdaging/uitdagingMachine'
import useStopwatch from '~/hooks/useStopwatch'

import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

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

  const { data: sublevelData } = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  const { setLevelSublevelMode, reset, setIsPlaying } = useLuisterenStore()

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
      setIsPlaying(false)
      send({ type: 'EXITGAME' })
    }
  }, [])

  function restartUitdaging() {
    send({
      type: 'RESTARTMACHINE',
    })
  }

  function startUitdaging() {
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
      countdownTimings: countdownTimings,
      countdownActions: stopwatch.actions,
    })
  }

  const isTestIntroductie = sublevelData?.name === 'TEST introductie'

  return (
    <>
      {idleState && isTestIntroductie && (
        <h3 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          {mode?.amountOfScenes} opdrachten om te oefenen
        </h3>
      )}
      {idleState && !isTestIntroductie && (
        <>
          <h3 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Speel tegen de klok
          </h3>
          <h3 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Doe {mode?.amountOfScenes} opdrachten zo snel mogelijk
          </h3>
        </>
      )}
      {idleState && (
        <StartUitdagingUI startUitdaging={startUitdaging} sublevelName={sublevelData?.name} />
      )}
      {playingState && (
        <h3 className="text-center text-4xl font-extrabold tracking-tight">
          {hours}:{minutes}:{seconds}
        </h3>
      )}
      {countdownState && <UitdagingCountdownPlayer />}
      {(playingState || countdownState) && (
        <UitdagingFragmentPlayerRenderer mode={mode} sublevelId={sublevelId} />
      )}
      {isFinishedState && <UitdagingFeedback options={{ gameId, levelId, restartUitdaging }} />}
    </>
  )
}

export default Uitdaging
