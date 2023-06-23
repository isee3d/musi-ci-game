import React from 'react'
import { SpelenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'

const CountdownPlayer: React.FC = () => {
  const spelenStates = SpelenMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="pointer-events-none absolute flex h-full w-full items-center justify-center text-center text-7xl font-extrabold tracking-tight">
      {spelenStates[1]?.split('.')[1]}
    </div>
  )
}

export default CountdownPlayer
