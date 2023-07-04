import React from 'react'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'

const TestCountdownPlayer: React.FC = () => {
  const testStates = TestModeMachineContext.useSelector((state) => state.toStrings())

  return (
    <div className="pointer-events-none absolute z-50 flex h-full w-full items-center justify-center text-center text-7xl font-extrabold tracking-tight">
      {testStates[1]?.split('.')[1]}
    </div>
  )
}

export default TestCountdownPlayer
