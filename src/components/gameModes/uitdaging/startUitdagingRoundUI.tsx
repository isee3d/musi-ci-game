import React from 'react'
import { Button } from '~/components/ui/button'
import { UitdagingMachineContext } from '~/pages/progress/[gameId]/[levelId]/[subLevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

const StartUitdagingUI: React.FC = () => {
  const { send } = UitdagingMachineContext.useActorRef()
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

export default StartUitdagingUI
