import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import { SpelenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface StartUIProps {
  levelId: string
  sublevelId: string
}

const StartUI: React.FC<StartUIProps> = ({ levelId, sublevelId }) => {
  const { send } = SpelenMachineContext.useActorRef()
  const { reset } = useLuisterenStore()

  return (
    <div className="flex justify-center space-x-5">
      <Button onClick={() => send('STARTCOUNTDOWN')}>
        <h3 className="text-center text-xl font-bold">Start</h3>
      </Button>
      <Button
        onClick={() => {
          reset()
          send('CANCELLEDPLAYING')
        }}
        asChild
      >
        <Link href={`/modeSelect/${levelId}/${sublevelId}`}>
          <h3 className="text-center text-xl font-bold">Annuleren</h3>
        </Link>
      </Button>
    </div>
  )
}

export default StartUI
