'use client'

import { Note } from '@prisma/client'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { baseNotes } from '~/components/fragmentPlayer/audio/Keyboard'
import Sampler from '~/components/fragmentPlayer/audio/Sampler'
import {
  FragmentWithNotes,
  FragmentWithNotesAndWeight
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import {
  adjustSingleItemWeight,
  adjustWeights,
  getNoteIndex,
  getNoteNameFromNoteIndex
} from '~/utils/fragmentUtils'

type AudioServiceState = {
  audioContext: AudioContext | undefined
  activeFragment: FragmentWithNotes | undefined
  piano: Sampler | undefined
  soundBoard: Sampler | undefined
  audioTime: number
  BPM: number
  PPQ: number
  hasSupport: boolean
  isInitialized: boolean
}

type AudioserviceAction = {
  init: () => void
  setAudioContext: (audioContext: AudioContext) => void
  setActiveFragment: (fragment: FragmentWithNotes | undefined) => void
  getCurrentTime: () => number
  setAudioTime: (audioTime: number) => void
  setPiano: (piano: Sampler) => void
  setBPM(bpm: number): void
  setSoundBoard: (soundBoard: Sampler) => void
  beatLengthInMs: () => number
  ticksToMS: (ticks: number) => number
  msToTicks: (ms: number) => number
  reset: () => void
  returnAudioBuffer: (arrBuffer: ArrayBuffer) => Promise<AudioBuffer>
  transposeFragments: (
    fragments: FragmentWithNotes[],
    direction: number,
    octave?: number,
  ) => FragmentWithNotes[] | FragmentWithNotesAndWeight[]
  transposeWeightedFragments: (
    fragments: FragmentWithNotesAndWeight[],
    octave: number,
    range: number[],
    pianoNotesmap: Map<string, { noteNumber: number; weight: number }>,
  ) => FragmentWithNotesAndWeight[]
  chooseWeightedActiveFragment: (
    fragments: FragmentWithNotesAndWeight[],
  ) => FragmentWithNotesAndWeight | undefined
}

const initialState = {
  BPM: 60,
}

const MS_PER_MINUTE = 1000 * 60

export const useAudioServiceStore = create<AudioServiceState & AudioserviceAction>((set, get) => ({
  audioTime: 0,
  BPM: 60,
  PPQ: 120,
  hasSupport: true,
  audioContext: undefined,
  piano: undefined,
  soundBoard: undefined,
  activeFragment: undefined,
  isInitialized: false,
  setAudioContext: (audioContext: AudioContext) => set({ audioContext }),
  setActiveFragment: (fragment: FragmentWithNotes | undefined) => set({ activeFragment: fragment }),
  setAudioTime: (audioTime: number) => set({ audioTime }),
  setPiano: (piano: Sampler) => set({ piano }),
  setBPM: (bpm: number) => set({ BPM: bpm }),
  setSoundBoard: (soundBoard: Sampler) => set({ soundBoard }),
  getCurrentTime: () => {
    const audioContext = get().audioContext
    return audioContext?.currentTime || 0
  },
  beatLengthInMs: () => {
    return MS_PER_MINUTE / get().BPM
  },
  ticksToMS: (ticks: number) => {
    return (ticks / get().PPQ / get().BPM) * MS_PER_MINUTE
  },
  msToTicks: (ms: number) => {
    return (ms / MS_PER_MINUTE) * get().PPQ * get().BPM
  },
  returnAudioBuffer: async (arrBuffer: ArrayBuffer) => {
    const audioContext = get().audioContext
    return new Promise((resolve, reject) => {
      audioContext?.decodeAudioData(
        arrBuffer,
        (buffer) => {
          resolve(buffer)
        },
        (error) => reject(error),
      )
    })
  },
  init: () => {
    const audioContext = get().audioContext
    if (audioContext) return
    try {
      // return new Promise((resolve) => {
        // setTimeout(async () => {
          // window.AudioContext = window.AudioContext || window.webkitAudioContext
          // const audioContext = new AudioContext()
          // set({ audioContext })
          // const audioTime = audioContext.currentTime
          // set({ audioTime })
          const piano = new Sampler([
            { note: 'C5', path: '/media/sampler/Salamander/C5.mp3' },
            { note: 'C4', path: '/media/sampler/Salamander/C4.mp3' },
            { note: 'C3', path: '/media/sampler/Salamander/C3.mp3' },
            { note: 'C2', path: '/media/sampler/Salamander/C2.mp3' },
          ])

          set({ piano })

          const soundBoard = new Sampler([
            { note: 'C6', path: '/media/sampler/soundboard/tick_high.mp3' },
            { note: 'C5', path: '/media/sampler/soundboard/tick_low.mp3' },
          ])

          set({ soundBoard })
          // set({ isInitialized: true })
          // return resolve()
        // }, 1000)
      // })
    } catch (e) {
      alert('Web Audio API not supported in this browser.')
      set({ hasSupport: false })
    }
  },
  chooseWeightedActiveFragment: (fragments: FragmentWithNotesAndWeight[]) => {
    let totalWeight = fragments.reduce((sum, fragment) => sum + fragment.weight, 0)
    let random = Math.random() * totalWeight

    for (let fragment of fragments) {
      random -= fragment.weight
      if (random < 0) {
        adjustWeights(fragments, fragment)
        return fragment
      }
    }
    // Fallback
    adjustSingleItemWeight(fragments[0])
    return fragments[0]
  },
  transposeWeightedFragments: (
    fragments: FragmentWithNotesAndWeight[],
    targetOctave: number,
    range: number[],
    pianoNotesMap: Map<string, { noteNumber: number; weight: number }>,
  ) => {
    const transposedFragments = fragments.map((fragment) => {
      const minTargetOctaveIndex = pianoNotesMap.get(`C${targetOctave}`)
      const maxTargetOctaveIndex = pianoNotesMap.get(`C${targetOctave + 1}`)

      // Get the note indices for the range's lowest C and highest B
      const minNoteRange = pianoNotesMap.get(`C${range[0]}`)
      const maxNoteRange = pianoNotesMap.get(`B${range[range.length - 1]}`)

      const firstNote = fragment.notes[0]
      const originalFirstNoteIndex = getNoteIndex(firstNote?.name ?? '')
      if (
        !originalFirstNoteIndex ||
        !minNoteRange ||
        !maxNoteRange ||
        !minTargetOctaveIndex ||
        !maxTargetOctaveIndex
      )
        return fragment

      // Calculate the range for possible transpositions for the first note
      let transposeRangeMin =
        Math.max(minNoteRange.noteNumber, minTargetOctaveIndex.noteNumber) -
        originalFirstNoteIndex.noteNumber
      let transposeRangeMax =
        Math.min(maxNoteRange.noteNumber, maxTargetOctaveIndex.noteNumber - 1) -
        originalFirstNoteIndex.noteNumber

      let highestNoteNumber = -Infinity
      let lowestNoteNumber = Infinity
      fragment.notes.forEach((note, index) => {
        if (index === 0) return // Skip the first note if needed
        const noteIndex = getNoteIndex(note.name)
        if (noteIndex) {
          highestNoteNumber = Math.max(highestNoteNumber, noteIndex.noteNumber)
          lowestNoteNumber = Math.min(lowestNoteNumber, noteIndex.noteNumber)
        }
      })

      transposeRangeMin = Math.max(transposeRangeMin, minNoteRange.noteNumber - lowestNoteNumber)
      transposeRangeMax = Math.min(
        transposeRangeMax,
        maxNoteRange.noteNumber - highestNoteNumber - 1,
      )

      // Generate a random transposition interval within this range
      // TODO: Check the weight in pianoNotesmap and do a weighted random
      // const transpositionInterval =
      //   Math.floor(Math.random() * (transposeRangeMax - transposeRangeMin + 1)) + transposeRangeMin

      let totalWeight = 0
      let weightedChoices = []

      for (let i = transposeRangeMin; i <= transposeRangeMax; i++) {
        const noteName = getNoteNameFromNoteIndex(originalFirstNoteIndex.noteNumber + i)
        const noteWeight = pianoNotesMap.get(noteName)?.weight || 0
        totalWeight += noteWeight
        weightedChoices.push({ interval: i, cumulativeWeight: totalWeight })
      }

      // Select a transposition interval based on weight
      let random = Math.random() * totalWeight
      let transpositionInterval =
        weightedChoices.find((choice) => random <= choice.cumulativeWeight)?.interval || 0

      const increaseAmount = 10
      const decreaseAmount = 5

      for (let i = transposeRangeMin; i <= transposeRangeMax; i++) {
        const noteName = getNoteNameFromNoteIndex(originalFirstNoteIndex.noteNumber + i)
        const noteWeight = pianoNotesMap.get(noteName)?.weight || 0
        if (!noteWeight) continue
        let newWeight = 0
        if (i === transpositionInterval) {
          newWeight = Math.max(noteWeight - decreaseAmount, 0)
        } else {
          newWeight = noteWeight + increaseAmount
        }
        // Set the new weight for the note in pianoNotesMap
        pianoNotesMap.set(noteName, {
          noteNumber: originalFirstNoteIndex.noteNumber + i,
          weight: newWeight,
        })
      }

      fragment.notes.forEach((note) => {
        const originalNoteIndex = getNoteIndex(note.name)
        if (!originalNoteIndex) return
        const transposedNoteIndex = originalNoteIndex.noteNumber + transpositionInterval
        note.name = getNoteNameFromNoteIndex(transposedNoteIndex)
      })

      fragment.octave = targetOctave
      if (fragment.notes[0] === undefined) return fragment
      fragment.transpose = fragment.notes[0].name
      return fragment
    })

    return transposedFragments
  },
  transposeFragments: (fragments: FragmentWithNotes[], direction: number, octave?: number) => {
    const newFragments: FragmentWithNotes[] = []

    for (let fragment of fragments) {
      if (!fragment) continue

      // Assuming the first note in the fragment is the ground tone
      const groundTone = fragment.notes[0]
      if (!groundTone) continue

      const groundToneNote = groundTone.name.replace(/\d/, '')
      const groundToneOctave = parseInt(groundTone.name.replace(/\D+/, ''))

      const groundToneIndex = baseNotes.findIndex((no) => no === groundToneNote)
      const totalShift = groundToneIndex + direction

      const transposedGroundToneOctave = groundToneOctave + Math.floor(totalShift / 12)
      let transposedGroundToneIndex = totalShift % 12
      if (transposedGroundToneIndex < 0) transposedGroundToneIndex += 12

      const semitoneDifference =
        transposedGroundToneIndex +
        12 * transposedGroundToneOctave -
        (groundToneIndex + 12 * groundToneOctave)

      const notes: Note[] = []
      for (let n of fragment.notes) {
        const note = n.name.replace(/\d/, '')
        const currentOctave = parseInt(n.name.replace(/\D+/, ''))

        const currentIndex = baseNotes.findIndex((no) => no === note)
        const totalShiftForNote = currentIndex + 12 * currentOctave + semitoneDifference

        const newOctave = Math.floor(totalShiftForNote / 12)
        const newIndex = totalShiftForNote % 12

        const newNoteBase = baseNotes[newIndex] || 'C'
        const newNoteName = newNoteBase + newOctave
        n.name = newNoteName
        notes.push(n)
      }

      fragment.notes = notes
      newFragments.push(fragment)
    }

    return newFragments
  },
  reset: () => {
    set(initialState)
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('NoteStore', useAudioServiceStore)
}
