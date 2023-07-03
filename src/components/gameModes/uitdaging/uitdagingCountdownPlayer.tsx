import React from 'react'
import {
  SpelenMachineContext,
  UitdagingMachineContext,
} from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'

const UitdagingCountdownPlayer: React.FC = () => {
  const testStates = UitdagingMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="pointer-events-none absolute flex h-full w-full items-center justify-center text-center text-7xl font-extrabold tracking-tight">
      {testStates[1]?.split('.')[1]}
    </div>
  )
}

export default UitdagingCountdownPlayer
