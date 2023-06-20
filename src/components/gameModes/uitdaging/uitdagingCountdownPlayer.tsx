import React from 'react'
import { SpelenMachineContext, UitdagingMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]'

const UitdagingCountdownPlayer: React.FC = () => {
  const spelenStates = UitdagingMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="absolute flex justify-center pointer-events-none h-full w-full items-center text-center text-7xl font-extrabold tracking-tight">
      {spelenStates[1]?.split('.')[1]}
    </div>
  )
}

export default UitdagingCountdownPlayer
