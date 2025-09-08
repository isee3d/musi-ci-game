import { useRouter } from 'next/router'
import React from 'react'
import { SpelenMachineContext } from '~/components/gameModes/spelen/spelenMachine'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

interface StartUIProps {
  startSpelen: () => void
}

const StartUI: React.FC<StartUIProps> = ({ startSpelen }) => {
  const { send } = SpelenMachineContext.useActorRef()
  const router = useRouter()

  function startSpelenAndCountdown() {
    startSpelen()
    send('STARTCOUNTDOWN')
  }

  return (
    <div className="flex flex-col gap-y-5">
      <Button size={'lg'} onClick={() => startSpelenAndCountdown()}>
        Start met spelen
      </Button>
      <Button size={'lg'} onClick={router.back}>
        Terug
      </Button>
    </div>
  )
}

export default StartUI
