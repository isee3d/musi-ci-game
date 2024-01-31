import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'
import Image from 'next/image'
import { routePaths } from '~/config/routing'
import { imagesConfig } from '~/config/site'

interface UitdagingFeedbackProps {
  levelId: string
  sublevelId: string
  gameId: string
}

const TestFeedback: React.FC<UitdagingFeedbackProps> = ({ gameId, levelId, sublevelId }) => {
  const {
    reset,
    getPercentageCorrectlyAnswered,
    endTime,
    startTime,
    setShouldRenderCinieInContentContainer,
    setIsPlaying,
  } = useLuisterenStore()

  useEffect(() => {
    setShouldRenderCinieInContentContainer(false)
    setIsPlaying(false)

    return () => setShouldRenderCinieInContentContainer(true)
  }, [])

  return (
    <>
      <Image
        src={imagesConfig.cinie}
        alt="cinie"
        className=""
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width={200}
        height={200}
      />
      <h3 className="text-center text-4xl font-extrabold tracking-tight">Test afgerond</h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Je hebt {formatTime(endTime - startTime)} gespeeld!
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Je hebt {getPercentageCorrectlyAnswered()}% goed
      </h3>
      <div className="flex justify-center">
        <Button asChild>
          <Link
            onClick={() => reset()}
            href={routePaths.sublevelSelectPage(gameId, parseInt(levelId))}
          >
            <h3>Rond de test af</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default TestFeedback
