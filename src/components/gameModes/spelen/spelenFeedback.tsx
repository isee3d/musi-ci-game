import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'
import Image from "next/legacy/image"
import { cn } from '~/lib/utils'
import { routePaths } from '~/config/routing'
import { imagesConfig } from '~/config/site'
import { Progress } from '~/components/ui/progress'
import { api } from '~/utils/api'

interface SpelenFeedbackProps {
  path: { gameId: string; levelId: string; restartSpelen: () => void }
}

const SpelenFeedback: React.FC<SpelenFeedbackProps> = ({ path }) => {
  const { gameId, levelId, restartSpelen } = path
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

  useEffect(() => {
    setShouldRenderCinieInContentContainer(false)
    setIsPlaying(false)

    return () => setShouldRenderCinieInContentContainer(true)
  }, [])

   const progressValue = () => {
     if (!levelPoints) return 0
     const level = levelPoints.find((level) => level.id === parseInt(levelId))
     if (!level?.points) return 0
     console.log(levelPoints, level?.points, level?.score)
     const progress = (level.score / level.points) * 100
     return Math.min(progress, 100)
   }

  return (
    <>
      <Image
        width={200}
        height={200}
        layout="fixed"
        src={imagesConfig.cinie}
        alt="cinie"
        className=""
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        objectFit="fill"
      />
      <h3 className="pb-10 text-center text-3xl font-extrabold md:text-4xl">Spelen afgerond</h3>
      <h3 className="text-center text-xl font-extrabold tracking-tight md:text-4xl">
        Je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      <h3 className="text-center text-xl font-extrabold tracking-tight md:text-4xl">
        Je hebt {getPercentageCorrectlyAnswered()}% goed
      </h3>
      {score > 0 && (
        <>
          <h3 className="text-center text-4xl font-extrabold tracking-tight">
            Je hebt {Number(score).toFixed(2)} punten verdiend
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
        <Button variant={'highlight'} onClick={() => restartSpelen()}>
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

export default SpelenFeedback
