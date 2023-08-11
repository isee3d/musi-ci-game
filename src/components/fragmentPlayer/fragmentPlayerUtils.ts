import { Note } from '@prisma/client'
import { KeyboardToNote } from '~/components/fragmentPlayer/audio/Keyboard'
import * as THREE from 'three'
import { NotePositionTime } from '~/components/fragmentPlayer/animationPlayer'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

const NOTES_IN_OCTAVE = 12
const SCALE_Y_FACTOR = 4
const PADDING_IN_PERCENT = 0.1

export const getNotesPositions = (
  notes: Note[],
  width: number,
  height: number,
  linewidth: number,
) => {
  const { msToTicks, ticksToMS } = useAudioServiceStore.getState()
  const range = KeyboardToNote.octaves * NOTES_IN_OCTAVE
  const noteHeight = (height / range) * SCALE_Y_FACTOR

  if (notes.length === 0) return []

  const avgNoteIndex = calculateAverageNoteIndex(notes)
  const centerYCorrection = calculateCenterYCorrection(height, avgNoteIndex, noteHeight)

  const padding = width * PADDING_IN_PERCENT
  const adjustedWidth = width - 2 * padding

  const sceneDuration = calculateSceneDuration(notes)
  const pxPerTick = adjustedWidth / msToTicks(sceneDuration)

  const noteLines: NotePositionTime[] = []
  notes.forEach((note) => {
    const startX = msToTicks(note.time) * pxPerTick + 15
    const endX = startX + msToTicks(note.duration) * pxPerTick - 15
    const yIndex = KeyboardToNote.getIndexFromNote(note.name)
    const noteY = yIndex * noteHeight - height / 2 + centerYCorrection
    const line: NotePositionTime = {
      position: [
        new THREE.Vector3(startX, noteY, 0),
        new THREE.Vector3(endX - linewidth, noteY, 0),
      ],
      time: ticksToMS(note.duration),
    }
    noteLines.push(line)
  })

  noteLines.sort((a, b) => {
    if (a.position[0] !== undefined && b.position[0] !== undefined) {
      return a.position[0]?.x - b.position[0].x
    }
    return 0
  })

  return noteLines
}

const calculateAverageNoteIndex = (notes: Note[]): number => {
  return (
    notes.reduce((sum, note) => sum + KeyboardToNote.getIndexFromNote(note.name), 0) / notes.length
  )
}

const calculateCenterYCorrection = (
  height: number,
  avgNoteIndex: number,
  noteHeight: number,
): number => {
  return height / 2 - avgNoteIndex * noteHeight
}

const calculateSceneDuration = (notes: Note[]): number => {
  return notes.reduce((max, note) => Math.max(max, note.time + note.duration), 0)
}
