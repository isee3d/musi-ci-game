import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Progress } from '~/components/ui/progress'
import { imagesConfig } from '~/config/site'
import { cn } from '~/lib/utils'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'
import { formatTime } from '~/utils/time'

interface LuisterenFeedbackProps {
  levelId: string
}

const LuisterenFeedback: React.FC<LuisterenFeedbackProps> = ({ levelId }) => {
  const { endTime, score, startTime, setShouldRenderCinieInContentContainer, setIsPlaying } =
    useLuisterenStore()

  const { data: levelPoints } = api.level.getPointsPerLevel.useQuery()
  const level = levelPoints?.find((level) => level.id === parseInt(levelId))

  useEffect(() => {
    setShouldRenderCinieInContentContainer(false)
    setIsPlaying(false)

    return () => setShouldRenderCinieInContentContainer(true)
  }, [])

  const progressValue = useMemo(() => {
    if (!levelPoints) return 0
    const level = levelPoints.find((level) => level.id === parseInt(levelId))
    if (!level?.points) return 0
    const progress = (level.score / level.points) * 100
    return Math.min(progress, 100)
  }, [levelPoints, levelId])

  return (
    <>
      <Image
        width={200}
        height={200}
        src={imagesConfig.cinie}
        alt="cinie"
        layout="fixed"
        objectFit="contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      {score > 0 && (
        <>
          <h3 className="text-center text-4xl font-extrabold tracking-tight">
            Je hebt {score} punten verdiend
          </h3>
          <div className=" w-1/2 px-12">
            <Progress
              indicatorColor={level?.color ? `${level.color}` : '#A020F0'}
              value={progressValue}
            />
          </div>
        </>
      )}
    </>
  )
}

export default LuisterenFeedback
