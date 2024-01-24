import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'
import Image from 'next/image'

interface SpelenFeedbackProps {
  levelId: string
  sublevelId: string
  gameId: string
}

const SpelenFeedback: React.FC<SpelenFeedbackProps> = ({ levelId, sublevelId, gameId }) => {
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
      <Image
        src="/images/cinie-duim.jpg"
        alt="cinie"
        className=""
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width={200}
        height={200}
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
      <div className="flex justify-center">
        <Button onClick={() => reset()} asChild>
          <Link href={`/progress/${gameId}/${levelId}`}>
            <h3>Terug naar overzicht</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default SpelenFeedback
