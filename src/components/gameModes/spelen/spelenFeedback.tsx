import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'
import Image from "next/legacy/image"
import { cn } from '~/lib/utils'
import { routePaths } from '~/config/routing'
import { imagesConfig } from '~/config/site'

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
  } = useLuisterenStore()

  useEffect(() => {
    setShouldRenderCinieInContentContainer(false)
    setIsPlaying(false)

    return () => setShouldRenderCinieInContentContainer(true)
  }, [])

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
      <h3 className="pb-10 text-center text-5xl font-extrabold">Spelen afgerond</h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Je hebt {getPercentageCorrectlyAnswered()}% goed
      </h3>
      {/* <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Felicitaties! -- gebaseerd op % en config
      </h3> */}
      <div className="flex justify-center gap-4">
        <Button
          className={cn('bg-purple-500 text-white hover:bg-purple-300')}
          onClick={() => restartSpelen()}
        >
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
