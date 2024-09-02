'use client'

import { Note } from '@prisma/client'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { baseNotes } from '~/components/fragmentPlayer/audio/Keyboard'
import Sampler from '~/components/fragmentPlayer/audio/Sampler'
import {
  FragmentWithNotes,
  FragmentWithNotesAndWeight,
} from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import {
  adjustSingleItemWeight,
  adjustWeights,
  getNoteIndex,
  getNoteNameFromNoteIndex,
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
    targetOctave: number,
    startingLetter: string,
  ) => FragmentWithNotes[]
  transposeWeightedFragments: (
    fragments: FragmentWithNotesAndWeight[],
    octave: number,
    range: number[],
    pianoNotesmap: Map<string, { noteNumber: number; weight: number }>,
  ) => FragmentWithNotesAndWeight[]
  chooseWeightedActiveFragment: (
    fragments: FragmentWithNotesAndWeight[],
    fragmentsToShow?: number,
    gameMode?: string,
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
  chooseWeightedActiveFragment: (
    fragments: FragmentWithNotesAndWeight[],
    fragmentsToShow?: number,
    gameMode?: string,
  ) => {
    let totalWeight = fragments.reduce((sum, fragment) => sum + fragment.weight, 0)
    let random = Math.random() * totalWeight

    for (let fragment of fragments) {
      random -= fragment.weight
      if (random < 0) {
        adjustWeights(fragments, fragment, fragmentsToShow, gameMode)
        return fragment
      }
    }
    // Fallback
    // adjustSingleItemWeight(fragments[0])
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
  transposeFragments: (
    fragments: FragmentWithNotes[],
    targetOctave: number,
    startingLetter: string,
  ) => {
    return fragments.map((fragment) => {
      if (fragment.notes.length === 0) {
        return fragment // Return fragment as is if no notes are present
      }

      // Determine the starting note's full designation (e.g., "C4") and its note index
      const startingNoteDesignation = `${startingLetter}${targetOctave}`
      const startingNoteIndex = getNoteIndex(startingNoteDesignation)
      if (!startingNoteIndex) {
        throw new Error(`Starting note ${startingNoteDesignation} not found in pianoNotesMap.`)
      }

      // Determine the first note in the fragment and its index
      const firstNoteInFragment = fragment.notes[0]
      if(!firstNoteInFragment) return fragment
      const firstNoteIndex = getNoteIndex(firstNoteInFragment.name)
      if (!firstNoteIndex) {
        throw new Error(`First note ${firstNoteInFragment.name} not found in pianoNotesMap.`)
      }

      // Calculate the transposition interval
      const transpositionInterval = startingNoteIndex.noteNumber - firstNoteIndex.noteNumber

      // Apply the transposition interval to all notes in the fragment
      fragment.notes.forEach((note) => {
        const originalNoteIndex = getNoteIndex(note.name)
        if (!originalNoteIndex) {
          throw new Error(`Note ${note.name} not found in pianoNotesMap.`)
        }
        const transposedNoteIndex = originalNoteIndex.noteNumber + transpositionInterval
        const transposedNoteName = getNoteNameFromNoteIndex(transposedNoteIndex)
        if (transposedNoteName === null) {
          throw new Error(
            `Transposed note index ${transposedNoteIndex} not found in pianoNotesMap.`,
          )
        }
        note.name = transposedNoteName // Update the note name to the transposed note
      })

      // Optionally update the octave of the fragment if needed
      fragment.octave = targetOctave
      if (fragment.notes[0] === undefined) return fragment
      fragment.transpose = fragment.notes[0].name

      return fragment
    })
  },
  reset: () => {
    set(initialState)
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('NoteStore', useAudioServiceStore)
}
