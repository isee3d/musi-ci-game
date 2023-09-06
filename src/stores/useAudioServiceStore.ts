import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import Sampler from '~/components/fragmentPlayer/audio/Sampler'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { baseNotes, allOctaves } from '~/components/fragmentPlayer/audio/Keyboard'
import { Note } from '@prisma/client'
import { canTranspose } from '~/utils/fragmentUtils'

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
  init: () => Promise<void>
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
  ) => FragmentWithNotes[]
  transposeFragmentsInOctave(
    fragments: FragmentWithNotes[],
    direction: number,
    octave: 0 | 1 | 2,
  ): FragmentWithNotes[]
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
  init: async () => {
    const audioContext = get().audioContext
    if (audioContext) return
    try {
      return new Promise((resolve) => {
        setTimeout(async () => {
          window.AudioContext = window.AudioContext || window.webkitAudioContext
          const audioContext = new AudioContext()
          set({ audioContext })
          const audioTime = audioContext.currentTime
          set({ audioTime })
          const piano = await new Sampler([
            { note: 'C5', path: '/media/sampler/Salamander/C5.mp3' },
            { note: 'C4', path: '/media/sampler/Salamander/C4.mp3' },
            { note: 'C3', path: '/media/sampler/Salamander/C3.mp3' },
            { note: 'C2', path: '/media/sampler/Salamander/C2.mp3' },
          ])

          set({ piano })

          const soundBoard = await new Sampler([
            { note: 'C6', path: '/media/sampler/soundboard/tick_high.mp3' },
            { note: 'C5', path: '/media/sampler/soundboard/tick_low.mp3' },
          ])

          set({ soundBoard })
          set({ isInitialized: true })
          return resolve()
        }, 1000)
      })
    } catch (e) {
      alert('Web Audio API not supported in this browser.')
      set({ hasSupport: false })
    }
  },
  transposeFragmentsInOctave: (
    fragments: FragmentWithNotes[],
    direction: number,
    octave: 0 | 1 | 2 = 1,
  ) => {
    const newFragments: FragmentWithNotes[] = []

    for (let i = 0; i < fragments.length; i++) {
      const fragment = fragments[i]
      const notes: Note[] = []
      if (!fragment) continue
      for (let j = 0; j < fragment.notes.length; j++) {
        const n = fragment.notes[j]
        if (!n) continue
        const note = n.name.replace(/\d/, '')
        let currentOctave = octave
        let index = allOctaves[currentOctave].findIndex((no) => no.replace(/\d/, '') === note)

        // Transpose in the given direction.
        index += direction

        // Wrap around within the available octaves if out of bounds.
        while (index < 0) {
          currentOctave -= 1
          if (currentOctave < 0) {
            currentOctave = 2 // Wrap to the highest octave
          }
          index += 12
        }

        while (index >= 12) {
          currentOctave += 1
          if (currentOctave > 2) {
            currentOctave = 0 // Wrap to the lowest octave
          }
          index -= 12
        }

        const newNote = allOctaves[currentOctave][index]
        if (!newNote) continue

        n.name = newNote
        notes.push(n)
      }
      fragment.notes = notes
      newFragments.push(fragment)
    }
    return newFragments
  },
  transposeFragments: (fragments: FragmentWithNotes[], direction: number, octave: number = 4) => {
    const newFragments: FragmentWithNotes[] = []
    const originalDirection = direction

    for (let i = 0; i < fragments.length; i++) {
      const fragment = fragments[i]
      const notes: Note[] = []
      if (!fragment) continue

      direction = originalDirection
      while (!canTranspose(fragment, direction) && Math.abs(direction) > 0) {
        direction -= Math.sign(direction) // Reduce direction by one semitone
      }
      if (Math.abs(direction) === 0) {
        // If we've exhausted all possibilities, we simply use the original fragment
        newFragments.push(fragment)
        continue
      }

      for (let j = 0; j < fragment.notes.length; j++) {
        const n = fragment.notes[j]
        if (!n) continue

        const note = n.name.replace(/\d/, '') // Extract note without octave
        let currentOctave = parseInt(n.name.replace(/\D+/, '')) // Extract current octave

        const index = baseNotes.findIndex((no) => no === note) + direction
        let newIndex = index % 12
        if (newIndex < 0) newIndex += 12

        if (index < 0) currentOctave -= 1
        if (index >= 12) currentOctave += 1

        // If the note is already in the desired octave, no need to change it
        if (currentOctave !== octave) {
          currentOctave = octave
        }

        // Ensure notes stay within the range of A0 to C8
        if (currentOctave < 0) {
          currentOctave = 0
          if (baseNotes[newIndex] === 'C') {
            newIndex = baseNotes.findIndex((no) => no === 'A')
          }
        }
        if (currentOctave > 8 || (currentOctave === 8 && baseNotes[newIndex] !== 'C')) {
          currentOctave = 8
          newIndex = baseNotes.findIndex((no) => no === 'C')
        }
        const newNoteBase = baseNotes[newIndex] || 'C'
        const newNoteName = newNoteBase + currentOctave
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
