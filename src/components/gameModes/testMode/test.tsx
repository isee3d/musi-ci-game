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
import { transpose, transposeTestOne, transposeTestTwo } from '~/utils/testUtils'
import { Button, buttonVariants } from '~/components/ui/button'
import useStopwatch from '~/hooks/useStopwatch'
import { cn } from '~/lib/utils'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { FragmentSceneData } from 'types/SceneData'
import { Session } from 'next-auth'
import { api } from '~/utils/api'
import { TestOne, TestTwo, test_1, test_2 } from '~/components/gameModes/testMode/testJsonData'

export let log: number[] = []

function testAlgorithm(fragments: FragmentWithNotes[], subLevelName: string) {
  log = []
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
    reset,
  } = useLuisterenStore.getState()

  let playedFragmentIdArray: number[] = []

  setLevelSublevelMode(10, 29, 4)
  reset()
  setStartTime(Date.now())

  let shownFragments: FragmentWithNotes[] = []
  let activeFragment: FragmentWithNotes | null = null
  for (let i = 0; i < 288; i++) {
    if (subLevelName === 'TEST, level 1') {
      const { transposedFragments, newActiveFragment } = transposeTestOne(fragments)
      shownFragments = transposedFragments
      activeFragment = newActiveFragment
    } else if (subLevelName === 'TEST, level 2') {
      const { transposedFragments, newActiveFragment } = transposeTestTwo(fragments)
      shownFragments = transposedFragments
      activeFragment = newActiveFragment
    }

    if (!activeFragment || !shownFragments) return

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
    setPlayedFragmentId(activeFragment.id)
    playedFragmentIdArray.push(activeFragment.id)
    setSceneStartTime(new Date())

    // Choose a random fragment to simulate the user choosing a fragment
    const userChosenFragment = shownFragments[Math.floor(Math.random() * shownFragments.length)]
    const isCorrectChosen = userChosenFragment?.id === activeFragment.id

    addNewUserSceneAnswer(isCorrectChosen)
    setChosenFragment(userChosenFragment?.id)
    setChosenFragmentLatency(Math.floor(Math.random() * 1000) + 1000)

    if (i === 287) {
      setEndTime(Date.now())
    }
    const { sceneData } = useLuisterenStore.getState()
    addScene(sceneData)
    resetSceneRelatedData()
  }

  function splitNoteAndOctave(input: string | undefined) {
    if (!input) return null
    // Regular expression to match the note (including possible sharp) and octave
    const regex = /^([A-G]#?)(\d+)$/

    const match = input.match(regex)

    if (match) {
      return {
        note: match[1],
        octave: parseInt(match[2], 10),
      }
    } else {
      return null // or handle invalid input as needed
    }
  }

  const compareArrays = (a, b) => {
    return a.toString() === b.toString()
  }

  // TODO: Reconstruct the test_1 json based on given data
  if (subLevelName === 'TEST, level 1') {
    const generatedTest_1: TestOne = []
    useLuisterenStore.getState().allPlayedScenes.forEach((scene, index) => {
      const temp: any = {}
      // console.log('scene: ', log[index])
      temp.scene = log[index]
      const result = splitNoteAndOctave(scene?.sceneFragments[0]?.groundTone)
      temp.octaaf = result?.octave
      temp.grondtoon = result?.note
      const playedFragment = fragments.find((fragment) => fragment.id === scene?.id_playedFragment)
      const fragmentOne = fragments.find(
        (fragment) => fragment.id === scene?.sceneFragments[0]?.id_fragment,
      )
      const fragmentTwo = fragments.find(
        (fragment) => fragment.id === scene?.sceneFragments[1]?.id_fragment,
      )
      temp.afspelen = playedFragment?.name
      temp.fragment_1 = fragmentOne?.name
      temp.fragment_2 = fragmentTwo?.name
      // console.log('temp: ', temp)
      generatedTest_1.push(temp)
    })

    // sort generatedTest_1 by scene number
    generatedTest_1.sort((a, b) => a.scene - b.scene)
    console.log('generatedTest_1: ', JSON.stringify(generatedTest_1))
    console.log(compareArrays(generatedTest_1, test_1))
  } else if (subLevelName === 'TEST, level 2') {
    const generatedTest_2: TestTwo = []
    useLuisterenStore.getState().allPlayedScenes.forEach((scene, index) => {
      const temp: any = {}
      temp.scene = log[index]
      const result = splitNoteAndOctave(scene?.sceneFragments[0]?.groundTone)
      temp.octaaf = result?.octave
      temp.grondtoon = result?.note
      const playedFragment = fragments.find((fragment) => fragment.id === scene?.id_playedFragment)
      const fragmentOne = fragments.find(
        (fragment) => fragment.id === scene?.sceneFragments[0]?.id_fragment,
      )
      const fragmentTwo = fragments.find(
        (fragment) => fragment.id === scene?.sceneFragments[1]?.id_fragment,
      )
      const fragmentThree = fragments.find(
        (fragment) => fragment.id === scene?.sceneFragments[2]?.id_fragment,
      )
      temp.afspelen = playedFragment?.name
      temp.fragment_1 = fragmentOne?.name
      temp.fragment_2 = fragmentTwo?.name
      temp.fragment_3 = fragmentThree?.name
      generatedTest_2.push(temp)
    })

    // sort generatedTest_2 by scene number
    generatedTest_2.sort((a, b) => a.scene - b.scene)
    console.log('generatedTest_2: ', JSON.stringify(generatedTest_2))
    console.log(compareArrays(generatedTest_2, test_2))
  }

  // const { getFormattedStoreData } = useLuisterenStore.getState()
  // console.log('formattedData: ', getFormattedStoreData('123345'))
  // const json = JSON.stringify(bigData)
  // const blob = new Blob([buffer], {
  //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // })
  // const link = document.createElement('a')
  // link.href = URL.createObjectURL(blob)
  // link.download = `data-${participantId}.xlsx`
  // link.click()

  // const blob = new Blob([json], { type: 'application/json' })
  // const url = URL.createObjectURL(blob)
  // const a = document.createElement('a')
  // a.download = 'test2.json'
  // a.href =
  //   'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bigData, null, 2))
  // a.click()
  // console.log('bigData: ', bigData)
  // console.log('formattedData: ', getFormattedStoreData(session.user.id))
  // saveToDB(getFormattedStoreData(session.user.id))
}

interface TestModeProps {
  fragments: FragmentWithNotes[]
  levelId: string
  sublevelId: string
  gameId: string
  sublevelName: string | undefined
  // fragmentsToShow: number
  // fragmentGroups: FragmentGroup[]
  // playTime: number | null | undefined
  mode: GameMode | null | undefined
}

const Test: React.FC<TestModeProps> = ({
  fragments,
  gameId,
  levelId,
  sublevelId,
  sublevelName,
  // fragmentsToShow,
  // fragmentGroups,
  // playTime,
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

  // const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation({
  //   onSuccess: (data) => {
  //     console.log('succesfully saved data: ', data)
  //   },
  //   onError: (error) => {
  //     console.error('error saving data: ', error)
  //   },
  // })

  // const stopwatch = useStopwatch(1000)

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
      // originalFragmentGroups: fragmentGroups as FragmentGroup[],
      // fragmentsToShow: fragmentsToShow,
      // countdownActions: stopwatch.actions,
      // groups: fragmentGroups as FragmentGroup[],
      sublevelName: sublevelName,
      originalFragments: fragments,
      countdownTimings: countdownTimings,
      amountOfScenes: mode?.amountOfScenes ?? 0,
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
      {isFinishedState && <TestFeedback gameId={gameId} levelId={levelId} />}

      {/* {session?.user.role === 'ADMIN' && (
        <Button
          className={cn(buttonVariants({ size: 'lg' }))}
          onClick={() => testAlgorithm(fragments, sublevelName ?? '')}
        >
          Print Test algoritme validatie
        </Button>
      )} */}
    </>
  )
}

export default Test
