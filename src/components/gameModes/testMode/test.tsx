import { GameMode } from '@prisma/client'
import React, { useEffect, useMemo } from 'react'
import { CountdownTimings } from 'types/Timings'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import TestFragmentPlayerRenderer from '~/components/gameModes/testMode/TestFragmentPlayerRenderer'
import AnswerQuestionsUI from '~/components/gameModes/testMode/answerQuestionsUI'
import StartTestUI from '~/components/gameModes/testMode/startTestRoundUI'
import TestCountdownPlayer from '~/components/gameModes/testMode/testCountdownPlayer'
import TestFeedback from '~/components/gameModes/testMode/testFeedback'
import { Button } from '~/components/ui/button'
import useStopwatch from '~/hooks/useStopwatch'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

interface TestModeProps {
  fragments: FragmentWithNotes[]
  levelId: string
  sublevelId: string
  gameId: string
  fragmentsToShow: number
  playTime: number | null | undefined
  mode: GameMode | null | undefined
}

// TODO:
// gr4ondtoon switching after 100 fragments

const Test: React.FC<TestModeProps> = ({
  fragments,
  gameId,
  levelId,
  sublevelId,
  fragmentsToShow,
  playTime,
  mode,
}) => {
  const { send } = TestModeMachineContext.useActorRef()
  const { setLevelSublevelMode, reset, setStartTime } = useLuisterenStore()
  const startRoundState = TestModeMachineContext.useSelector((state) => state.matches('startRound'))
  const countdownState = TestModeMachineContext.useSelector((state) => state.matches('countdown'))
  const playingState = TestModeMachineContext.useSelector((state) => state.matches('playing'))
  const answeringQuestionsState = TestModeMachineContext.useSelector((state) =>
    state.matches('answeringQuestions')
  )
  const isPausedState = TestModeMachineContext.useSelector((state) => state.matches('pausedGame'))
  const isFinishedState = TestModeMachineContext.useSelector((state) =>
    state.matches('FinishedPlayingTestMode')
  )
  const didNotAnswerState = TestModeMachineContext.useSelector((state) =>
    state.matches('playing.didNotAnswerFragment')
  )

    const QuestionsOfSublevelQuery = api.sublevel.getQuestionsOfSublevel.useQuery(
      {
        sublevelId: sublevelId,
      },
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
    [mode]
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
      levelFragments: fragments,
      fragmentsToShow: fragmentsToShow,
      countdownTimings: countdownTimings,
      countdownActions: stopwatch.actions,
    })
  }, [])

  return (
    <>
      <h3 className=" text-center text-4xl font-extrabold tracking-tight">Probeer de test</h3>
      {playingState && (
        <Button
          onClick={() => {
            send({
              type: getPauseOrResumeEvent(),
            })
          }}
        >
          {isPausedState ? `Hervat` : `Pauzeer`}
        </Button>
      )}

      {startRoundState && <StartTestUI />}
      {answeringQuestionsState && (
        <AnswerQuestionsUI sublevelId={sublevelId} questions={QuestionsOfSublevelQuery?.data?.map(item => item.question)} />
      )}
      {countdownState && <TestCountdownPlayer />}
      {(playingState || countdownState) && <TestFragmentPlayerRenderer mode={mode}/>}
      {didNotAnswerState && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center text-4xl font-extrabold tracking-tight">
            Je hebt niet geantwoord
          </h3>
          <p className="text-center text-2xl font-extrabold tracking-tight">
            Volgende fragment begint zo
          </p>
        </div>
      )}
      {isFinishedState && (
        <TestFeedback gameId={gameId} levelId={levelId} sublevelId={sublevelId} />
      )}
    </>
  )
}

export default Test
