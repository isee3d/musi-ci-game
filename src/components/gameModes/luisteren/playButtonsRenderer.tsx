import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { LuisterenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

const PlayButtonsRenderer: React.FC = () => {
  const { data: sessionData } = useSession()

  const { send } = LuisterenMachineContext.useActorRef()
  const { resetSceneRelatedData, setEndTime, sceneData, addScene, getFormattedStoreData } =
    useLuisterenStore()
  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation()

  if (!sessionData?.user) return null

  return (
    <div className='flex justify-center gap-4'>
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
      <Button
        size={'lg'}
        onClick={() => {
          send('FINISHEDLISTENING')
          setEndTime(Date.now())
          saveToDB(getFormattedStoreData(sessionData.user.id))
        }}
      >
        Stop
      </Button>
    </div>
  )
}

export default PlayButtonsRenderer
