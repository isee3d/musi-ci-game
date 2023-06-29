import { GameMode } from '@prisma/client'
import React, { useMemo } from 'react'
import { CountdownTimings } from 'types/Timings'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

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
// 1. Create a new state machine for this mode
// 2. create vragenlijst before playing
// 3. Create too late to answer logic (10s)
// 4. gelijk fragment moet altijdvoorkomen, alle andere evenredig verdeeld
// 5. pause button
// 6. no user feedback
// 7. time played and score in percentage

const TestMode: React.FC<TestModeProps> = ({
  fragments,
  gameId,
  levelId,
  sublevelId,
  fragmentsToShow,
  playTime,
  mode,
}) => {
  // Here comes all thexstate machine logic
  const { setLevelSublevelMode, reset, setStartTime } = useLuisterenStore()

  const countdownTimings: CountdownTimings = useMemo(
    () => ({
      one: mode?.one ?? 1000,
      two: mode?.two ?? 1000,
      three: mode?.three ?? 1000,
      go: mode?.go ?? 1000,
    }),
    [mode]
  )

  return <></>
}

export default TestMode
