import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'

interface UitdagingFeedbackProps {
  levelId: string
  sublevelId: string
  gameId: string
}

const TestFeedback: React.FC<UitdagingFeedbackProps> = ({ gameId, levelId, sublevelId }) => {
  const { reset, getPercentageCorrectlyAnswered, endTime, startTime } = useLuisterenStore()

  return (
    <>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">Test afgerond</h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Je hebt {formatTime(endTime - startTime)} gespeeld!
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight ">
        Je hebt {getPercentageCorrectlyAnswered()}% goed
      </h3>
      <div className="flex justify-center">
        <Button asChild>
          <Link onClick={() => reset()} href={`/progress/${gameId}/${levelId}/${sublevelId}`}>
            <h3>Rond de test af</h3>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default TestFeedback
