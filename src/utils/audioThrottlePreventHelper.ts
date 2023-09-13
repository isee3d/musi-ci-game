import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

let silentNode: AudioBufferSourceNode | null = null;

export function startSilentAudio() {
   if (silentNode) {
     console.log('Silent audio is already playing.')
     return
   }


  const { audioContext } = useAudioServiceStore.getState()

  if (!audioContext) return

  // Create a 1-second silent buffer
  const silentBuffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate,
    audioContext.sampleRate,
  )
  silentNode = audioContext.createBufferSource()
  silentNode.buffer = silentBuffer
  silentNode.loop = true
  silentNode.connect(audioContext.destination)
  silentNode.start()
}

export function stopSilentAudio() {
  if (silentNode !== null) {
    silentNode.stop()
    silentNode = null
  }
}
