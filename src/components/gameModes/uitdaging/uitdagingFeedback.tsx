import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'

interface UitdagingFeedbackProps {
  levelId: string
  sublevelId: string
  gameId: string
}

const UitdagingFeedback: React.FC<UitdagingFeedbackProps> = ({ gameId, levelId, sublevelId }) => {
  const { reset, getPercentageCorrectlyAnswered, endTime, startTime } = useLuisterenStore()

  return (
    <>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        je hebt {formatTime(endTime - startTime)} gespeeld!
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Je hebt {getPercentageCorrectlyAnswered()} % correct!
      </h3>
      {/* <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Felicitaties! -- gebaseerd op % en config
      </h3> */}
      <div className="flex justify-center">
        <Button asChild>
          <Link onClick={() => reset()} href={`/modeSelect/${levelId}/${sublevelId}`}>
            <h3>Terug naar overzicht</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default UitdagingFeedback
