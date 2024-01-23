import { Note } from '@prisma/client'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

export async function start(
  fragment: FragmentWithNotes | undefined,
  {
    onStartPlaying,
    onFinishedPlaying,
  }: { onStartPlaying?: () => void; onFinishedPlaying?: () => void } = {}
) {
  if (!fragment) return

  const { piano, ticksToMS } = useAudioServiceStore.getState()
  if (!piano) return

  if (onStartPlaying) onStartPlaying()

  const playPromises = fragment.notes.map((note: Note) => {
    return piano.play({
      note: note.name,
      sustain: 500,
      releaseMs: ticksToMS(note.duration),
      volume: note.speed,
      delay: ticksToMS(note.time),
    })
  })

  await Promise.all(playPromises)
  if (onFinishedPlaying) onFinishedPlaying()
}

export async function stopAll(onAllStopped?: () => void) {
  const { piano } = useAudioServiceStore.getState()
  await piano?.stopAll(onAllStopped)
}

export async function initializeSound() {
  const { piano } = useAudioServiceStore.getState()
  if (!piano) return

  await piano.ready
  await piano?.play({ note: 'C4', volume: 1, sustain: 200, releaseMs: 200 })
  await piano?.play({
    note: 'C5',
    volume: 1,
    sustain: 200,
    releaseMs: 200,
    delay: 400,
  })
}

export async function testSound() {
  const { piano } = useAudioServiceStore.getState()
  if (!piano) return
  await piano.ready
  await piano?.play({ note: 'C4', volume: 1, sustain: 400, releaseMs: 1000 })
  await piano?.play({
    note: 'C5',
    volume: 1,
    sustain: 400,
    releaseMs: 1850,
    delay: 50,
  })
  await piano?.play({ note: 'C4', volume: 1, sustain: 400, releaseMs: 1000 })
  await piano?.play({
    note: 'A5',
    volume: 1,
    sustain: 400,
    releaseMs: 1378,
    delay: 300,
  })
  await piano?.play({ note: 'C2', volume: 1, sustain: 400, releaseMs: 1000 })
  await piano?.play({
    note: 'A4',
    volume: 1,
    sustain: 400,
    releaseMs: 1378,
    delay: 300,
  })
}
