import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'


const LuisterenFeedback: React.FC = () => {
  const { score, endTime, startTime } = useLuisterenStore()

  return (
    <>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        You played for {formatTime(endTime - startTime)}
      </h3>
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        You scored {score} points!
      </h3>
    </>
  )
}

export default LuisterenFeedback
