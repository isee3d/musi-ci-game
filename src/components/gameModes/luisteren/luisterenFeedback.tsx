import Image from 'next/legacy/image'
import { useEffect } from 'react'
import { Progress } from '~/components/ui/progress'
import { imagesConfig } from '~/config/site'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { formatTime } from '~/utils/time'

const LuisterenFeedback: React.FC = () => {
  const { score, endTime, startTime, setShouldRenderCinieInContentContainer, setIsPlaying } =
    useLuisterenStore()

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
        src={imagesConfig.cinie}
        alt="cinie"
        layout="fixed"
        objectFit="contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Je hebt {formatTime(endTime - startTime)} gespeeld
      </h3>
      {/* <h3 className="text-center text-4xl font-extrabold tracking-tight">
        Je hebt {score} punten verdiend
      </h3>
      <div className=' w-1/2 px-12'>
        <Progress className='text-orange-500' indicatorColor='bg-red-500' value={33} />
      </div> */}
    </>
  )
}

export default LuisterenFeedback
