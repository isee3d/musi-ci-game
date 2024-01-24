import { useEffect } from 'react'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'
import Image from 'next/image'

const LuisterenFeedback: React.FC = () => {
  const { score, endTime, startTime, setShouldRenderCinieInContentContainer } = useLuisterenStore()

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
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      {/* <h3 className="text-center text-4xl font-extrabold tracking-tight">
        You scored {score} points!
      </h3> */}
    </>
  )
}

export default LuisterenFeedback
