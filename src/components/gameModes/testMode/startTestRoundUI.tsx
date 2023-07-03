import React from 'react'
import { Button } from '~/components/ui/button'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

const StartTestUI: React.FC = () => {
  const { send } = TestModeMachineContext.useActorRef()
  const { setStartTime } = useLuisterenStore()

  return (
    <div className="flex justify-center space-x-5">
      <Button
        size={'lg'}
        onClick={() => {
          send('STARTCOUNTDOWN')
          setStartTime(Date.now())
        }}
      >
        <h3>Start</h3>
      </Button>
    </div>
  )
}

export default StartTestUI
