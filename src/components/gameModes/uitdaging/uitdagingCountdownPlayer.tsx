import React from 'react'
import {
  SpelenMachineContext,
  UitdagingMachineContext,
} from '~/pages/progress/[gameId]/[levelId]/[subLevelId]/[mode]'

const UitdagingCountdownPlayer: React.FC = () => {
  const spelenStates = UitdagingMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="pointer-events-none absolute flex h-full w-full items-center justify-center text-center text-7xl font-extrabold tracking-tight">
      {spelenStates[1]?.split('.')[1]}
    </div>
  )
}

export default UitdagingCountdownPlayer
