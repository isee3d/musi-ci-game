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
    getPercentageCorrectlyAnswered,
    endTime,
    startTime,
    setShouldRenderCinieInContentContainer,
    setIsPlaying,
    score,
  } = useLuisterenStore()

  useEffect(() => {
    setShouldRenderCinieInContentContainer(false)
    setIsPlaying(false)

    return () => setShouldRenderCinieInContentContainer(true)
  }, [])

  return (
    <>
      <h3 className="text-center text-3xl font-extrabold md:text-4xl">Uitdaging afgerond</h3>
      <h3 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl ">
        je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      <h3 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl ">
        Je hebt {getPercentageCorrectlyAnswered()} % goed
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Je hebt {score} punten verdiend
      </h3>
      <div className="flex justify-center gap-4">
        <Button variant={'highlight'} onClick={restartUitdaging}>
          Speel opnieuw
        </Button>
        <Button asChild>
          <Link href={routePaths.sublevelSelectPage(gameId, parseInt(levelId))}>
            <h3>Terug naar overzicht</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default UitdagingFeedback
