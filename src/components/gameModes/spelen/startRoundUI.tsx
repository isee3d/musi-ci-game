import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { SpelenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface StartUIProps {
  levelId: string
  sublevelId: string
  gameId: string
}

const StartUI: React.FC<StartUIProps> = ({ levelId, sublevelId, gameId }) => {
  const { send } = SpelenMachineContext.useActorRef()
  const { reset } = useLuisterenStore()

  return (
    <div className="flex flex-col justify-center gap-y-5">
      <Button onClick={() => send('STARTCOUNTDOWN')}>
        <h3 className="text-center text-xl font-bold">Start met spelen</h3>
      </Button>
      <Button
        className={cn('m-0')}
        onClick={() => {
          reset()
          send('CANCELLEDPLAYING')
        }}
        asChild
      >
        <Link href={`/progress/${gameId}/${levelId}/${sublevelId}`}>
          <h3 className="text-center text-xl font-bold">Terug</h3>
        </Link>
      </Button>
    </div>
  )
}

export default StartUI
