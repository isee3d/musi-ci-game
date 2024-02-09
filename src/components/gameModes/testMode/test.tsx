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
import { transpose } from '~/utils/testUtils'
import { Button, buttonVariants } from '~/components/ui/button'
import useStopwatch from '~/hooks/useStopwatch'
import { cn } from '~/lib/utils'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { FragmentSceneData } from 'types/SceneData'
import { Session } from 'next-auth'
import { api } from '~/utils/api'

type LogType = {
  [fragmentId: string]: {
    [octave: string]: number
  }
}

function testAlgorithm(
  fragmentGroups: FragmentGroup[],
  fragmentsToShow: number,
  amountOfScenes: number,
  session: Session,
  saveToDB: any,
) {
  const {
    addNewUserSceneAnswer,
    AddSceneData,
    setEndTime,
    setChosenFragment,
    setChosenFragmentLatency,
    setSceneStartTime,
    setStartTime,
    addScene,
    resetSceneRelatedData,
    setPlayedFragmentId,
    setLevelSublevelMode,
  } = useLuisterenStore.getState()

  let log: LogType = {}
  let totalCount = 0

  setLevelSublevelMode(10, 29, 4)

  let convertedFragmentGroups = fragmentGroups.map((group) => ({
    ...group,
    fragments: group.fragments.map((fragment) => ({
      ...fragment,
      weight: 100,
    })),
  })) as FragmentGroupWithWeights[]

  setStartTime(Date.now())

  for (let i = 0; i < 300; i++) {
    const { transposedFragments: shownFragments, newActiveFragment } = transpose(
      fragmentsToShow,
      amountOfScenes,
      convertedFragmentGroups,
      pianoNotesMap,
    )

    // Save the new scene data to the store
    const newSceneData: FragmentSceneData[] = []
    shownFragments.forEach((fragment, index) => {
      newSceneData.push({
        id_fragment: fragment.id,
        fragmentIndex: index,
        groundTone: fragment.transpose ?? '',
        octave: fragment.octave ?? -1,
      })
    })

    AddSceneData(newSceneData)
    setPlayedFragmentId(newActiveFragment.id)
    setSceneStartTime(new Date())

    // Choose a random fragment to simulate the user choosing a fragment
    const userChosenFragment = shownFragments[Math.floor(Math.random() * shownFragments.length)]
    const isCorrectChosen = userChosenFragment?.id === newActiveFragment.id

    addNewUserSceneAnswer(isCorrectChosen)
    setChosenFragment(userChosenFragment?.id)
    setChosenFragmentLatency(Math.floor(Math.random() * 1000) + 1000)

    if (i === amountOfScenes) {
      setEndTime(Date.now())
    }

    addScene(useLuisterenStore.getState().sceneData)
    resetSceneRelatedData()
  }

  const { newUsedFragmentsMap, getFormattedStoreData } = useLuisterenStore.getState()

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

  console.log(
    'Log of fragment usage by octave:',
    log,
    'count:',
    totalCount,
    'ran with amountofFragmentsinScene: ',
    fragmentsToShow,
  )
  console.log('formattedData: ', getFormattedStoreData(session.user.id))
  // saveToDB(getFormattedStoreData(session.user.id))
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
  const { setLevelSublevelMode, reset, setStartTime, newUsedFragmentsMap, setIsPlaying } =
    useLuisterenStore()
  const idleState = TestModeMachineContext.useSelector((state) => state.matches('idle'))
  const startRoundState = TestModeMachineContext.useSelector((state) => state.matches('startRound'))
  const restAfterAnsweringState = TestModeMachineContext.useSelector((state) =>
    state.matches('playing.restAfterAnswering'),
  )
  const countdownState = TestModeMachineContext.useSelector((state) => state.matches('countdown'))
  const playingState = TestModeMachineContext.useSelector((state) => state.matches('playing'))
  const guessHeardFragmentState = TestModeMachineContext.useSelector((state) =>
    state.matches('playing.guessHeardFragment'),
  )
  const isPausedState = TestModeMachineContext.useSelector((state) => state.matches('pausedGame'))
  const isFinishedState = TestModeMachineContext.useSelector((state) =>
    state.matches('FinishedPlayingTestMode'),
  )
  const amountPlayed = TestModeMachineContext.useSelector((state) => state.context.amountPlayed)

  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation({
    onSuccess: (data) => {
      console.log('succesfully saved data: ', data)
    },
    onError: (error) => {
      console.error('error saving data: ', error)
    },
  })

  const stopwatch = useStopwatch(1000)

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
    return () => setIsPlaying(false)
  }, [])

  function startTest() {
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
  }

  return (
    <>
      {idleState && <StartTestUI startTest={startTest} />}
      {countdownState && <TestCountdownPlayer />}
      {playingState && <TestFragmentPlayerRenderer mode={mode} />}
      {(playingState || isPausedState) && (
        <Button
          className={cn(
            'cursor-not-allowed',
            restAfterAnsweringState || isPausedState ? 'cursor-pointer' : '',
          )}
          disabled={!restAfterAnsweringState && !isPausedState}
          onClick={() => {
            send({
              type: isPausedState ? `RESUMEGAME` : `PAUSEGAME`,
            })
          }}
        >
          {isPausedState ? `Hervat` : `Pauzeer`}
        </Button>
      )}
      {isFinishedState && (
        <TestFeedback gameId={gameId} levelId={levelId} sublevelId={sublevelId} />
      )}

      {session?.user.role === 'ADMIN' && (
        <Button
          className={cn(buttonVariants({ size: 'lg' }))}
          onClick={() =>
            testAlgorithm(fragmentGroups, 3, 300, session, saveToDB)
          }
        >
          Print Test algoritme validatie
        </Button>
      )}
    </>
  )
}

export default Test
