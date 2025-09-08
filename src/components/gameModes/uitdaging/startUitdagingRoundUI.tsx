import { useRouter } from 'next/router'
import React from 'react'
import { UitdagingMachineContext } from '~/components/gameModes/uitdaging/uitdagingMachine'
import { Button } from '~/components/ui/button'

import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface StartUitdagingUIProps {
  startUitdaging: () => void
  sublevelName: string | undefined
}

const StartUitdagingUI: React.FC<StartUitdagingUIProps> = ({ startUitdaging, sublevelName }) => {
  const { send } = UitdagingMachineContext.useActorRef()
  const { setStartTime } = useLuisterenStore()
  const router = useRouter()

  function startUitdagingAndCountdown() {
    startUitdaging()
    send('STARTCOUNTDOWN')
    setStartTime(Date.now())
  }

  return (
    <div className="flex flex-col justify-center gap-y-5">
      <Button size={'lg'} onClick={startUitdagingAndCountdown}>
        {sublevelName === 'TEST introductie' ? <h3>Start</h3> : <h3>Start met uitdaging</h3>}
      </Button>
      <Button size={'lg'} onClick={router.back}>
        <h3>Terug</h3>
      </Button>
    </div>
  )
}

export default StartUitdagingUI
