import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'

interface SpelenFeedbackProps {
  levelId: string
  sublevelId: string
}

const SpelenFeedback: React.FC<SpelenFeedbackProps> = ({ levelId, sublevelId }) => {
  const { reset, getPercentageCorrectlyAnswered, endTime, startTime } = useLuisterenStore()

  return (
    <>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        You played for {formatTime(endTime - startTime)}
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        You have {getPercentageCorrectlyAnswered()} % correct!
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Felicitaties! -- gebaseerd op % en config
      </h3>
      <div className="flex justify-center">
        <Button onClick={() => reset()} asChild>
          <Link href={`/modeSelect/${levelId}/${sublevelId}`}>
            <h3>Terug naar overzicht</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default SpelenFeedback
