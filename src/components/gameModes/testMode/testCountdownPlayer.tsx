import React from 'react'
import { TestModeMachineContext } from '~/components/gameModes/testMode/testMachine'

const TestCountdownPlayer: React.FC = () => {
  const testStates = TestModeMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="pointer-events-none flex h-full w-full items-center justify-center p-14 text-center text-xl font-extrabold tracking-tight lg:text-7xl">
      De test begint in: {testStates[1]?.split('.')[1]}
    </div>
  )
}

export default TestCountdownPlayer
