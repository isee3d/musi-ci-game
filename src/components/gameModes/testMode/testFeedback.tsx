import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'
import Image from "next/legacy/image"
import { routePaths } from '~/config/routing'
import { imagesConfig } from '~/config/site'

interface TestFeedbackProps {
  levelId: string
  gameId: string
}

const TestFeedback: React.FC<TestFeedbackProps> = ({ gameId, levelId }) => {
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
      <h3 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
        Test afgerond
      </h3>
      <h3 className="text-center text-xl font-extrabold tracking-tight md:text-4xl ">
        Je hebt {formatTime(endTime - startTime)} gespeeld!
      </h3>
      <h3 className="text-center text-xl font-extrabold tracking-tight md:text-4xl ">
        Je hebt {getPercentageCorrectlyAnswered()}% goed
      </h3>
      <div className="flex justify-center">
        <Button asChild>
          <Link href={routePaths.sublevelSelectPage(gameId, parseInt(levelId))}>
            <h3>Rond de test af</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default TestFeedback
