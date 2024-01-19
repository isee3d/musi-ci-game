// import { returnAudioBuffer } from '~/components/fragmentPlayer/audio/AudioServiceUtils';
// import AudioService from './AudioService';

import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

interface SampleLoadData {
  /** i.e. /media/sampler/Salamander/C3.mp3 you can omit '/public' */
  path: string
  note: NoteName
  tuneNote?: {
    closestNote: string
    playRate: number
  }
}

interface SampleData {
  // play: (options: NotePlayOptions) => void;
  isPlaying: boolean
  // stop: () => void;
  buffer?: NamedAudioBuffer
  source?: AudioBufferSourceNode
}

export interface NotePlayOptions {
  note: string
  attackMs?: number
  sustain: number
  releaseMs: number
  volume: number
  /** in milliseconds */
  delay?: number
}

interface NamedAudioBuffer extends AudioBuffer {
  name: string
  noteIndex: number
  playRate: number
}

type SampleIndex = { [key: string]: SampleData }

export type NoteName = string

// octaaf 12 verschillende noten
//iedere octaaf omhgoog is verdubbbbelen van de frequentie
// eerste C definieren op 131hz
// volgende C is 262hz
// volgende C is 524hz
// volgende C is 1048hz

// voor test duidelijk verschillende octaven gebruiken
// in te stellen bij het maken van fragmenten
// test1: [131 - 262] Hz [c3 - c4]
// test2: [262 - 524] Hz [c4 - c5]    basenotes
// test3: [524 - 1048] Hz [c5 - c6]
export const baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const generatePianoNotes = () => {
  const notes = []

  // Standard piano range is from A0 to C8
  for (let octave = 0; octave <= 8; octave++) {
    for (let i = 0; i < baseNotes.length; i++) {
      // Special cases for the first and last partial octaves
      if (octave === 0 && baseNotes[i] === 'C') {
        continue // Skip C0, starts from A0
      }
      if (octave === 8 && baseNotes[i] !== 'C') {
        continue // Stop after C8
      }
      notes.push(`${baseNotes[i]}${octave}`)
    }
  }

  return notes
}

export default class Sampler {
  private samples: SampleIndex = {}

  private audioBuffers: NamedAudioBuffer[] = []

  private notes = generatePianoNotes()

  private pausedAtTime?: number

  public ready: Promise<void>

  constructor(samples: SampleLoadData[]) {
    this.ready = Promise.all(
      samples.map((s) => {
        return Sampler.setupSampleData(s, this.notes)
      }),
    ).then((sampleData) => {
      sampleData.forEach((s) => {
        const { note, buffer } = s
        if (buffer) this.audioBuffers.push(buffer)
        this.samples[note] = { buffer, isPlaying: false }
      })
    })
  }

  private static async getAudioBufferFromPath(
    filepath: string,
    name: string,
  ): Promise<NamedAudioBuffer> {
    const { returnAudioBuffer } = useAudioServiceStore.getState()
    const response = await fetch(filepath)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = (await returnAudioBuffer(arrayBuffer)) as NamedAudioBuffer
    audioBuffer.name = name

    return audioBuffer
  }

  private getAudioBufferByName(name: string): NamedAudioBuffer | undefined {
    return this.audioBuffers.find((x) => x.name === name)
  }

  private static async setupSampleData(
    sampleData: SampleLoadData,
    notes: string[],
  ): Promise<{
    note: string
    isPlaying: boolean
    buffer: NamedAudioBuffer
  }> {
    const { note, path } = sampleData
    // const filePath = '/media/sampler/Salamander/C3.mp3';
    const buffer = await Sampler.getAudioBufferFromPath(path, note)

    buffer.noteIndex = notes.findIndex((n) => n === note)

    buffer.playRate = 1

    return { note, isPlaying: false, buffer }
  }

  private getBufferPlaybackRate(buffer: NamedAudioBuffer, note: string): number {
    const goal = this.notes.findIndex((n) => n === note)

    const difference = goal - buffer.noteIndex

    // same as Math.Pow(2, (1/12))
    const playRate = 2 ** (difference / 12)

    return playRate
  }

  private returnClosestBuffer(note: string): NamedAudioBuffer {
    // index of the 'goal' note
    const goal = this.notes.findIndex((n) => n === note)
    const closest = this.audioBuffers.reduce((prev, curr) => {
      return Math.abs(curr.noteIndex - goal) < Math.abs(prev.noteIndex - goal) ? curr : prev
    })

    if (!closest) throw new Error(`No Buffer for ${note} found`)

    return closest
  }

  private updateSamples(note: string, sampleSource: AudioBufferSourceNode): void {
    if (!this.samples[note]) {
      this.samples[note] = { isPlaying: false, buffer: undefined, source: undefined }
    }
    if (!note) return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.samples[note].source = sampleSource || undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.samples[note].isPlaying = true
  }

  public async play(options: NotePlayOptions): Promise<void> {
    return new Promise(async (resolve) => {
      const { audioContext, getCurrentTime } = useAudioServiceStore.getState()
      if (audioContext?.state === 'closed' || audioContext?.state === 'suspended') {
        await audioContext.resume()
      }

      const { note, attackMs, sustain, releaseMs, volume, delay } = options

      if (!audioContext) return

      const buffer = this.samples[note]?.buffer || this.returnClosestBuffer(note)
      const playRate = this.getBufferPlaybackRate(buffer, note)

      const noteEnvelope = audioContext.createGain() as GainNode

      const sampleSource = audioContext.createBufferSource()
      sampleSource.buffer = buffer

      sampleSource.playbackRate.setValueAtTime(playRate, getCurrentTime())

      const now = getCurrentTime()
      const startTime = now + (delay || 0) / 1000 // Add delay to the current time

      this.updateSamples(note, sampleSource)

      noteEnvelope.gain.cancelScheduledValues(now)
      noteEnvelope.gain.setValueAtTime(0, startTime)
      noteEnvelope.gain.linearRampToValueAtTime(volume, startTime + (attackMs || 1) / 1000)
      noteEnvelope.gain.linearRampToValueAtTime(0, startTime + sustain / 1000 + releaseMs / 1000)
      sampleSource.connect(noteEnvelope).connect(audioContext.destination)
      sampleSource.start(startTime)
      sampleSource.stop(startTime + sustain / 1000 + releaseMs / 1000)
      sampleSource.onended = () => {
        resolve()
      }
    })
  }

  public pause(): void {
    const { audioContext, getCurrentTime } = useAudioServiceStore.getState()
    if (audioContext?.state === 'running') {
      audioContext.suspend()
      this.pausedAtTime = getCurrentTime()
    }
  }

  public async resume(): Promise<void> {
    const { audioContext } = useAudioServiceStore.getState()
    if (audioContext?.state === 'suspended' && this.pausedAtTime !== undefined) {
      await audioContext.resume()
      this.pausedAtTime = undefined
    }
  }

  public stop(note: string, onStopped?: () => void): void {
    if (!this.samples[note]) return
    const { isPlaying, source } = this.samples[note] as SampleData
    if (isPlaying && source) {
      source.stop()
    }

    onStopped?.()
  }

  public async stopAll(onAllStopped?: () => void): Promise<void> {
    const stopPromises = Object.keys(this.samples).map((note) => {
      return new Promise<void>((resolve) => {
        this.stop(note, () => {
          resolve()
        })
      })
    })

    await Promise.all(stopPromises)

    onAllStopped?.()
  }
}
