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
    setScore,
    luisterenClicks,
    allPlayedScenes,
  } = useLuisterenStore()
  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation()
  const { mutate: saveScore } = api.levelResult.saveScore.useMutation({
    onSuccess: () => {
      send('FINISHEDLISTENING')
    },
  })

  const { data: sublevel } = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  if (!session?.user) return null

  const onFinishedPlaying = () => {
    setEndTime(Date.now())
    const { endTime } = useLuisterenStore.getState()
    if (allPlayedScenes.length > 0) {
      setScore(
        calculatePoints({
          minutes: (endTime - startTime) / 60000,
          clicks: luisterenClicks,
          mFactor: sublevel?.mFactor,
          kFactor: sublevel?.kFactor,
        }),
      )
      const { score } = useLuisterenStore.getState()
      saveToDB(getFormattedStoreData(session.user.id))
      saveScore({ id_User: session.user.id, score: score, id_sublevel: parseInt(sublevelId) })
    } else {
      send('FINISHEDLISTENING')
    }
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
