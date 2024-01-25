import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '~/components/ui/button'
import { UitdagingMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface StartUitdagingUIProps {
  startUitdaging: () => void
}

const StartUitdagingUI: React.FC<StartUitdagingUIProps> = ({ startUitdaging }) => {
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
        <h3>Start met uitdaging</h3>
      </Button>
      <Button size={'lg'} onClick={router.back}>
        <h3>Terug</h3>
      </Button>
    </div>
  )
}

export default StartUitdagingUI
