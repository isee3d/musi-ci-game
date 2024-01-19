import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'

interface SpelenFeedbackProps {
  levelId: string
  sublevelId: string
  gameId: string
}

const SpelenFeedback: React.FC<SpelenFeedbackProps> = ({ levelId, sublevelId, gameId }) => {
  const { reset, getPercentageCorrectlyAnswered, endTime, startTime } = useLuisterenStore()

  return (
    <>
      <h3 className="text-center text-5xl font-extrabold pb-10">Spelen afgerond</h3>
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
          <Link href={`/progress/${gameId}/${levelId}/${sublevelId}`}>
            <h3>Terug naar overzicht</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default SpelenFeedback
