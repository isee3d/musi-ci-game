import React from 'react'
import { UitdagingMachineContext } from '~/components/gameModes/uitdaging/uitdagingMachine'

const UitdagingCountdownPlayer: React.FC = () => {
  const testStates = UitdagingMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="relative flex size-full items-center justify-center py-10 text-center">
      <div className="pointer-events-none absolute z-50 size-full text-7xl font-extrabold tracking-tight">
        {testStates[1]?.split('.')[1]}
      </div>
    </div>
  )
}

export default UitdagingCountdownPlayer
