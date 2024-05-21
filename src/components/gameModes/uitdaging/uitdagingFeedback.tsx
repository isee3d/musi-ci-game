import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { Button } from '~/components/ui/button'
import { Progress } from '~/components/ui/progress'
import { routePaths } from '~/config/routing'
import { cn } from '~/lib/utils'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'
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

  const { data: levelPoints } = api.level.getPointsPerLevel.useQuery()
  const level = levelPoints?.find((level) => level.id === parseInt(levelId))

  const progressValue = () => {
    if (!levelPoints) return 0
    const level = levelPoints.find((level) => level.id === parseInt(levelId))
    if (!level?.points) return 0
    if (level.score >= level.points) return 100
    console.log(levelPoints, level?.points, level?.score)
    const progress = (level.score / level.points) * 100
    return Math.min(progress, 100)
  }

  useEffect(() => {
    setShouldRenderCinieInContentContainer(false)
    setIsPlaying(false)

    return () => setShouldRenderCinieInContentContainer(true)
  }, [])

  return (
    <>
      <h3 className="text-center text-3xl font-extrabold md:text-4xl">Uitdaging afgerond</h3>
      <h3 className="text-center text-xl font-extrabold tracking-tight md:text-4xl ">
        je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      <h3 className="text-center text-xl font-extrabold tracking-tight md:text-4xl ">
        Je hebt {getPercentageCorrectlyAnswered()} % goed
      </h3>
      {score > 0 && (
        <>
          <h3 className="text-center text-4xl font-extrabold tracking-tight">
            Je hebt {Number(score).toFixed(0)} punten verdiend
          </h3>
          <div className=" w-1/2 px-12">
            <Progress
              indicatorColor={level?.color ? `${level.color}` : '#A020F0'}
              value={progressValue()}
            />
          </div>
        </>
      )}
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
