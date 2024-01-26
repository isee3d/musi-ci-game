import { GameMode } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useMemo } from 'react'
import { CountdownTimings } from 'types/Timings'
import { FragmentGroup, FragmentGroupWithWeights } from 'types/fragmentGroup'
import { pianoNotesMap } from '~/components/fragmentPlayer/audio/Keyboard'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import TestFragmentPlayerRenderer from '~/components/gameModes/testMode/TestFragmentPlayerRenderer'
import StartTestUI from '~/components/gameModes/testMode/startTestRoundUI'
import TestCountdownPlayer from '~/components/gameModes/testMode/testCountdownPlayer'
import TestFeedback from '~/components/gameModes/testMode/testFeedback'
import { selectActiveAndTransposeFragmentsForScene } from '~/components/gameModes/testMode/testMachine'
import { Button, buttonVariants } from '~/components/ui/button'
import useStopwatch from '~/hooks/useStopwatch'
import { cn } from '~/lib/utils'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

type LogType = {
  [fragmentId: string]: {
    [octave: string]: number
  }
}

function testAlgorithm(
  times: number,
  fragmentGroups: FragmentGroup[],
  fragmentsToShow: number,
  amountOfScenes: number,
) {
  let log: LogType = {}
  let totalCount = 0

  const convertedFragmentGroups = fragmentGroups.map((group) => ({
    ...group,
    fragments: group.fragments.map((fragment) => ({
      ...fragment,
      weight: 100,
    })),
  })) as FragmentGroupWithWeights[]

  for (let i = 0; i < times; i++) {
    selectActiveAndTransposeFragmentsForScene(
      fragmentsToShow,
      amountOfScenes,
      convertedFragmentGroups,
      pianoNotesMap,
    )
  }

  const { newUsedFragmentsMap } = useLuisterenStore.getState()

  // Update the log with the results of each iteration
  for (const [fragmentId, octaveData] of Object.entries(newUsedFragmentsMap)) {
    log[fragmentId] = log[fragmentId] || {}
    //@ts-ignore
    for (const [octave, count] of Object.entries(octaveData)) {
      // @ts-ignore
      log[fragmentId][octave] = (log[fragmentId][octave] || 0) + count
      totalCount += count
    }
  }

  console.log('Log of fragment usage by octave:', log, 'count:', totalCount)
  console.log('pianoNotesMap', pianoNotesMap)
}

interface TestModeProps {
  fragments: FragmentWithNotes[]
  levelId: string
  sublevelId: string
  gameId: string
  fragmentsToShow: number
  fragmentGroups: FragmentGroup[]
  playTime: number | null | undefined
  mode: GameMode | null | undefined
}

const Test: React.FC<TestModeProps> = ({
  fragments,
  gameId,
  levelId,
  sublevelId,
  fragmentsToShow,
  fragmentGroups,
  playTime,
  mode,
}) => {
  const { data: session } = useSession()
  const { send } = TestModeMachineContext.useActorRef()
  const { setLevelSublevelMode, reset, setStartTime, newUsedFragmentsMap } = useLuisterenStore()
  const startRoundState = TestModeMachineContext.useSelector((state) => state.matches('startRound'))
  const countdownState = TestModeMachineContext.useSelector((state) => state.matches('countdown'))
  const playingState = TestModeMachineContext.useSelector((state) => state.matches('playing'))
  const guessHeardFragmentState = TestModeMachineContext.useSelector((state) =>
    state.matches('playing.guessHeardFragment'),
  )
  const isPausedState = TestModeMachineContext.useSelector((state) => state.matches('pausedGame'))
  const isFinishedState = TestModeMachineContext.useSelector((state) =>
    state.matches('FinishedPlayingTestMode'),
  )

  const stopwatch = useStopwatch(1000)
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

  function getPauseOrResumeEvent() {
    return isPausedState ? `RESUMEGAME` : `PAUSEGAME`
  }

  useEffect(() => {
    reset()
    setStartTime(Date.now())
    setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), mode?.id ?? 0)
    send({
      type: 'STARTROUND',
      originalFragmentGroups: fragmentGroups as FragmentGroup[],
      fragmentsToShow: fragmentsToShow,
      countdownTimings: countdownTimings,
      amountOfScenes: mode?.amountOfScenes ?? 0,
      countdownActions: stopwatch.actions,
      groups: fragmentGroups as FragmentGroup[],
    })
  }, [])

  return (
    <>
      {startRoundState && <StartTestUI />}
      {countdownState && <TestCountdownPlayer />}
      {playingState && <TestFragmentPlayerRenderer mode={mode} />}
      {(playingState || isPausedState) && (
        <Button
          className={cn(
            'cursor-not-allowed',
            guessHeardFragmentState || isPausedState ? 'cursor-pointer' : '',
          )}
          disabled={!guessHeardFragmentState && !isPausedState}
          onClick={() => {
            send({
              type: getPauseOrResumeEvent(),
            })
          }}
        >
          {isPausedState ? `Hervat` : `Pauzeer`}
        </Button>
      )}
      {/* {session?.user.role === 'ADMIN' && (
        <Button
          className={cn(buttonVariants({ size: 'lg' }))}
          onClick={() => testAlgorithm(300, fragmentGroups, 3, 300)}
        >
          Print Test algoritme validatie
        </Button>
      )} */}
      {isFinishedState && (
        <TestFeedback gameId={gameId} levelId={levelId} sublevelId={sublevelId} />
      )}
    </>
  )
}

export default Test
