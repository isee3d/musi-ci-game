import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { cn } from '~/lib/utils'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'

interface UitdagingFeedbackProps {
  options: { gameId: string; levelId: string; restartUitdaging: () => void }
}

const UitdagingFeedback: React.FC<UitdagingFeedbackProps> = ({
  options: { gameId, levelId, restartUitdaging },
}) => {
  const {
    reset,
    getPercentageCorrectlyAnswered,
    endTime,
    startTime,
    setShouldRenderCinieInContentContainer,
  } = useLuisterenStore()

  useEffect(() => {
    setShouldRenderCinieInContentContainer(false)
    return () => {
      setShouldRenderCinieInContentContainer(true)
    }
  }, [])

  return (
    <>
      <h3 className="text-center text-4xl font-extrabold">Uitdaging afgerond</h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Je hebt {getPercentageCorrectlyAnswered()} % goed
      </h3>
      {/* <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Felicitaties! -- gebaseerd op % en config
      </h3> */}
      <div className="flex justify-center gap-4">
        <Button
          className={cn('bg-purple-500 text-white hover:bg-purple-300')}
          onClick={restartUitdaging}
        >
          Speel opnieuw
        </Button>
        <Button asChild>
          <Link onClick={reset} href={routePaths.sublevelSelectPage(gameId, parseInt(levelId))}>
            <h3>Terug naar overzicht</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default UitdagingFeedback
