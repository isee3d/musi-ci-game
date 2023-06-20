import React from 'react'
import { SpelenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]'

const CountdownPlayer: React.FC = () => {
  const spelenStates = SpelenMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="absolute flex justify-center pointer-events-none text-center h-full w-full items-center text-7xl font-extrabold tracking-tight">
      {spelenStates[1]?.split('.')[1]}
    </div>
  )
}

export default CountdownPlayer
