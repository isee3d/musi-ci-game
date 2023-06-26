import { useSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '~/components/ui/button'
import { LuisterenMachineContext } from '~/pages/progress/[gameId]/[levelId]/[sublevelId]/[mode]'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

const PlayButtonsRenderer: React.FC = () => {
  const { data: sessionData } = useSession()

  if(!sessionData?.user) return null
  
  const { send } = LuisterenMachineContext.useActorRef()
  const { resetSceneRelatedData, setEndTime, sceneData, addScene, getFormattedStoreData } =
    useLuisterenStore()
  const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation({
    onSuccess: () => {
      toast.success('levelResult created!')
    },
    onError: () => {
      toast.error('Failed to upload new levelresult!')
    },
  })

  return (
    <>
      <Button
        size={'lg'}
        onClick={() => {
          send('SHUFFLEFRAGMENTS')
          addScene(sceneData)
          resetSceneRelatedData()
        }}
      >
        <h3>Play knop</h3>
      </Button>
      <Button
        size={'lg'}
        onClick={() => {
          send('FINISHEDLISTENING')
          setEndTime(Date.now())
          saveToDB(getFormattedStoreData(sessionData.user.id))
        }}
      >
        <h3>Stop Luisteren</h3>
      </Button>
    </>
  )
}

export default PlayButtonsRenderer
