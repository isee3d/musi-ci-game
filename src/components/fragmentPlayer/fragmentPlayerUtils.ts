import { Note } from "@prisma/client";
import { KeyboardToNote } from "~/components/fragmentPlayer/audio/Keyboard";
import * as THREE from 'three';
import { NotePositionTime } from "~/components/fragmentPlayer/animationPlayer";
import { useAudioServiceStore } from "~/stores/useAudioServiceStore";

export const getNotesPositions = (
  notes: Note[],
  width: number,
  height: number,
  linewidth: number,
) => {
  const { ticksToMS } = useAudioServiceStore.getState()
  const range = KeyboardToNote.octaves * 12
  const noteHeight = height / range
  // Have some padding on the sides of the whole fragment
  const adjustedWidth = width * 0.95

  const spacing = adjustedWidth * 0.01

  if (notes.length === 0) return []

  // Calculate the average note index
  const avgNoteIndex =
    notes.reduce((sum, note) => sum + KeyboardToNote.getIndexFromNote(note.name), 0) / notes.length
  const centerYCorrection = height / 2 - avgNoteIndex * noteHeight


  const sceneDuration = notes.reduce((max, note) => Math.max(max, note.time + note.duration), 0)

  const noteLines: NotePositionTime[] = []
  notes.forEach((note) => {
    const startX = (note.time / sceneDuration) * adjustedWidth
    const endX = startX + (note.duration / sceneDuration) * adjustedWidth - linewidth - spacing
    const yIndex = KeyboardToNote.getIndexFromNote(note.name)
    const noteY = yIndex * noteHeight - height / 2 + centerYCorrection
    const line: NotePositionTime = {
      position: [new THREE.Vector3(startX, noteY, 0), new THREE.Vector3(endX, noteY, 0)],
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
