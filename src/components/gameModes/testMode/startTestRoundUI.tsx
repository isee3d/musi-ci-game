import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '~/components/ui/button'
import { TestModeMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface StartTestProps {
  startTest: () => void
}

const StartTestUI: React.FC<StartTestProps> = ({ startTest }) => {
  const { send } = TestModeMachineContext.useActorRef()
  const { setStartTime } = useLuisterenStore()
  const router = useRouter()

  function startTestAndCountdown() {
    startTest()
    send('STARTCOUNTDOWN')
    setStartTime(Date.now())
  }

  return (
    <>
      <h3 className=" text-center text-3xl font-extrabold tracking-tight md:text-4xl">
        Veel success met de Test
      </h3>
      <div className="flex justify-center space-x-5">
        <Button size={'lg'} onClick={startTestAndCountdown}>
          Start
        </Button>
        <Button size={'lg'} onClick={router.back}>
          Terug
        </Button>
      </div>
    </>
  )
}

export default StartTestUI
