import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { initializeSound, start } from '~/components/fragmentPlayer/audio/AudioControls'
import { Icons } from '~/components/icons'
import { Button } from '~/components/ui/button'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { AudioContext } from 'standardized-audio-context'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
}

const InitializeSoundModal: React.FC<BaseStaticModalProps> = ({ setmodal }) => {
  const { data: session } = useSession()
  const { audioContext, setAudioContext, init } = useAudioServiceStore()
  const [clickedButton, setClickedButton] = useState<boolean>(false)

  async function initializeAudio(triggerThroughGesture: boolean = false) {
    //@ts-ignore
    window.start = start

    init()

    if (!audioContext) {
      // const AudioContext = window.AudioContext || window.webkitAudioContext
      const context = new AudioContext()
      context.resume()
      setAudioContext(context)
      setmodal(false)
    } else if (audioContext?.state === 'running') {
      setmodal(false)
    }

    if (triggerThroughGesture) {
      setClickedButton(true)
      await initializeSound()
      setmodal(false)
    }
  }

  if (!session?.user.id) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative m-6 w-auto max-w-3xl rounded-lg border-4 border-accent-foreground">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-background shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold text-center">Klik om het geluid in te schakelen. U hoort nu twee tonen</h3>
            </div>
            <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
              <Button
                type="button"
                size={'lg'}
                onClick={() => initializeAudio(true)}
                disabled={clickedButton}
              >
                <Icons.music />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-50 backdrop-blur-3xl"></div>
    </>
  )
}

export default InitializeSoundModal
