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
    <div className="flex flex-col justify-center gap-y-5">
      <Button onClick={() => startSpelenAndCountdown()}>
        <h3 className="text-center text-xl font-bold">Start met spelen</h3>
      </Button>
      <Button
        className={cn('m-0')}
        onClick={() => {
          router.back()
        }}
      >
        <h3 className="text-center text-xl font-bold">Terug</h3>
      </Button>
    </div>
  )
}

export default StartUI
