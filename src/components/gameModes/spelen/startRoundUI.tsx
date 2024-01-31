import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { SpelenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'

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
