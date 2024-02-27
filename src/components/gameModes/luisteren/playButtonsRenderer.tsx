import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { LuisterenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'
import { calculatePoints } from '~/utils/pointssystem'

interface PlayButtonsRendererProps {
  sublevelId: string
}

const PlayButtonsRenderer: React.FC<PlayButtonsRendererProps> = ({ sublevelId }) => {
  const { data: session } = useSession()

  const { send } = LuisterenMachineContext.useActorRef()
  const {
    resetSceneRelatedData,
    setEndTime,
    sceneData,
    addScene,
    getFormattedStoreData,
    startTime,
    endTime,
    setScore,
    luisterenClicks,
  } = useLuisterenStore()
  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation()

  const { data: sublevel } = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  if (!session?.user) return null

  const onFinishedPlaying = () => {
    send('FINISHEDLISTENING')
    setScore(
      calculatePoints({
        minutes: (endTime - startTime) / 60000,
        clicks: luisterenClicks,
        mFactor: sublevel?.mFactor,
        kFactor: sublevel?.kFactor,
      }),
    )
    setEndTime(Date.now())
    saveToDB(getFormattedStoreData(session.user.id))
  }

  return (
    <div className="flex justify-center gap-4">
      <Button
        size={'lg'}
        onClick={() => {
          send('SHUFFLEFRAGMENTS')
          addScene(sceneData)
          resetSceneRelatedData()
        }}
      >
        hoger/lager
      </Button>
      <Button size={'lg'} onClick={() => onFinishedPlaying()}>
        Stop
      </Button>
    </div>
  )
}

export default PlayButtonsRenderer
