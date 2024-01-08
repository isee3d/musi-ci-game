// import * as Tone from 'tone';

import { FragmentWithNotesAndWeight } from "~/components/fragmentPlayer/audio/fragmentWithNotes";

export enum Keyboard {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  SHIFT = 16,
  CTRL = 17,
  ALT = 18,
  PAUSE = 19,
  CAPS_LOCK = 20,
  ESCAPE = 27,
  SPACE = 32,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  END = 35,
  HOME = 36,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
  INSERT = 45,
  DELETE = 46,
  KEY_0 = 48,
  KEY_1 = 49,
  KEY_2 = 50,
  KEY_3 = 51,
  KEY_4 = 52,
  KEY_5 = 53,
  KEY_6 = 54,
  KEY_7 = 55,
  KEY_8 = 56,
  KEY_9 = 57,
  KEY_A = 65,
  KEY_B = 66,
  KEY_C = 67,
  KEY_D = 68,
  KEY_E = 69,
  KEY_F = 70,
  KEY_G = 71,
  KEY_H = 72,
  KEY_I = 73,
  KEY_J = 74,
  KEY_K = 75,
  KEY_L = 76,
  KEY_M = 77,
  KEY_N = 78,
  KEY_O = 79,
  KEY_P = 80,
  KEY_Q = 81,
  KEY_R = 82,
  KEY_S = 83,
  KEY_T = 84,
  KEY_U = 85,
  KEY_V = 86,
  KEY_W = 87,
  KEY_X = 88,
  KEY_Y = 89,
  KEY_Z = 90,
  LEFT_META = 91,
  RIGHT_META = 92,
  SELECT = 93,
  NUMPAD_0 = 96,
  NUMPAD_1 = 97,
  NUMPAD_2 = 98,
  NUMPAD_3 = 99,
  NUMPAD_4 = 100,
  NUMPAD_5 = 101,
  NUMPAD_6 = 102,
  NUMPAD_7 = 103,
  NUMPAD_8 = 104,
  NUMPAD_9 = 105,
  MULTIPLY = 106,
  ADD = 107,
  SUBTRACT = 109,
  DECIMAL = 110,
  DIVIDE = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NUM_LOCK = 144,
  SCROLL_LOCK = 145,
  SEMICOLON = 186,
  EQUALS = 187,
  COMMA = 188,
  DASH = 189,
  PERIOD = 190,
  FORWARD_SLASH = 191,
  GRAVE_ACCENT = 192,
  OPEN_BRACKET = 219,
  BACK_SLASH = 220,
  CLOSE_BRACKET = 221,
  SINGLE_QUOTE = 222,
}

export const baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Create C3, C4, and C5 octaves.
const lowerOctave = baseNotes.map(note => note + '3');
const middleOctave = baseNotes.map(note => note + '4');
const upperOctave = baseNotes.map(note => note + '5');

export const allOctaves: [string[], string[], string[]] = [lowerOctave, middleOctave, upperOctave]

export const generateNotes = (octaves: number) => {
  const notes = [];
  for (let i = 2; i < octaves + 1; i += 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (let j = 0; j < baseNotes.length; j += 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      notes.push(`${baseNotes[j] + i}`);
    }
  }

  return notes;
};

export class PianoTransposer {
    baseNotes: string[];
    initialWeights: number[];
    weights: number[];
    selectionFrequency: number[];
    lowestNote: string;
    highestNote: string;
    minOctave: number;
    maxOctave: number;
    maxFrequencyPerOctave: number;
    fragmentFrequencyInOctave: Map<number, Map<number, number>>;

   constructor(minOctave: number, maxOctave: number, maxFrequencyPerOctave?: number) {
    this.baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    this.initialWeights = new Array(this.baseNotes.length).fill(1);
    this.weights = [...this.initialWeights];
    this.selectionFrequency = new Array(this.baseNotes.length).fill(0);
    this.lowestNote = 'A0';
    this.highestNote = 'C8';
    this.minOctave = minOctave;
    this.maxOctave = maxOctave;
    this.maxFrequencyPerOctave = maxFrequencyPerOctave  || Infinity;

    this.fragmentFrequencyInOctave = new Map();
    for (let octave = minOctave; octave <= maxOctave; octave++) {
        this.fragmentFrequencyInOctave.set(octave, new Map());
    }
  }

   setWeights(newWeights: number[]) {
    if (newWeights.length === this.baseNotes.length) {
      this.weights = newWeights;
    } else {
      throw new Error('Weights array must be the same length as base notes');
    }
  }

  resetWeights() {
    this.weights.fill(1); // Reset to equal distribution
  }

  getWeights() {
    return this.weights;
  }

  transposeFragments(fragments: FragmentWithNotesAndWeight[]) {
    const newFragments: FragmentWithNotesAndWeight[] = [];
    let direction: number = 0;

    for (let fragment of fragments) {
      if (!fragment || !fragment.notes.length) continue;

      const notes = [];
      direction = this.weightedRandom() ?? 0;

      for (let note of fragment.notes) {
        const noteIndex = this.baseNotes.indexOf(note.name.slice(0, -1));
        const octave = parseInt(note.name.slice(-1));
        const totalShift = noteIndex + direction;

        let newOctave = octave + Math.floor(totalShift / 12);
        let newIndex = totalShift % 12;
        if (newIndex < 0) {
          newIndex += 12;
          newOctave -= 1;
        }

        // Ensure the transposed note is within the specified octave range
        if (newOctave < this.minOctave || newOctave > this.maxOctave) continue;

        // @ts-ignore
        const newNoteName = this.baseNotes[newIndex] + newOctave;

        // Ensure the transposed note is within the piano's range
        if (this.isWithinPianoRange(newNoteName)) {
                let fragmentId = fragment.id;
                let newOctave = this.findAvailableOctave(fragmentId);
                // @ts-ignore
                const newNoteName = this.baseNotes[newIndex] + newOctave;
                notes.push({ ...note, name: newNoteName });
                this.incrementFragmentFrequency(fragmentId, newOctave);
            }
      }

      if (notes.length > 0) {
        newFragments.push({ ...fragment, notes });
      }

       this.updateWeights(direction);
    }

    return { newFragments, direction };
  }

  findAvailableOctave(fragmentId: number) {
    for (let octave = this.minOctave; octave <= this.maxOctave; octave++) {
         if (!this.maxFrequencyPerOctave || this.getFragmentFrequency(fragmentId, octave) < this.maxFrequencyPerOctave) {
            return octave;
        }
    }

    return this.minOctave;  // Fallback to minOctave if no other octave is available
}


  incrementFragmentFrequency(fragmentId: number, octave: number) {
      let currentFrequency = this.getFragmentFrequency(fragmentId, octave) || 0;
      this.fragmentFrequencyInOctave.get(octave)?.set(fragmentId, currentFrequency + 1);
  }

  getFragmentFrequency(fragmentId: number, octave: number) {
      return this.fragmentFrequencyInOctave.get(octave)?.get(fragmentId) || 0;
  }

   weightedRandom() {
    let totalWeight = this.weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < this.weights.length; i++) {
      // @ts-ignore
      if (random < this.weights[i]) return i - (this.weights.length / 2);
      // @ts-ignore
      random -= this.weights[i];
    }
  }

  updateWeights(selectedDirection: number) {
      const selectedIndex = (selectedDirection + this.baseNotes.length) % this.baseNotes.length;

      for (let i = 0; i < this.weights.length; i++) {
          if (i === selectedIndex) {
            // @ts-ignore
              this.weights[i] = Math.max(this.weights[i] - 1, 1);
          } else {
              this.weights[i] += 0.5;
          }
      }
    }

   isWithinPianoRange(noteName: string) {
    const pianoLowestIndex = this.noteToIndex(this.lowestNote);
    const pianoHighestIndex = this.noteToIndex(this.highestNote);
    const noteIndex = this.noteToIndex(noteName);

    return noteIndex >= pianoLowestIndex && noteIndex <= pianoHighestIndex;
  }

   noteToIndex(noteName: string) {
    const note = noteName.slice(0, -1);
    const octave = parseInt(noteName.slice(-1));
    const noteIndex = this.baseNotes.indexOf(note);

    return octave * 12 + noteIndex;
  }
}

export class KeyboardToNote {
  // Maps regular Keyboard to Musical Notes
  // i.e. C4 = Q
  static octaves = 5;

  /** shifts note -1 => Q = C#4 */
  static offSetNote = 0;

  static notes: string[] = generateNotes(5);

  static currentKeys: string[] = [];

  // static emitter = new Tone.Emitter();

  static init(): void {
    document.addEventListener('keydown', (e) => this.triggerAttack(e));
    document.addEventListener('keyup', (e) => this.triggerRelease(e));

    if (!navigator.requestMIDIAccess) {
      alert('No Midi Access, please use Chrome for MIDI keyboard');
      return;
    }

    navigator.requestMIDIAccess().then((access) => {
      const values = access.inputs.values();
      Array.from(values).forEach((v: any) => {
        v.onmidimessage = (m: any) => {
          const [command, key, velocity] = m.data;
          switch (command) {
            case 144:
              this.triggerMidiNote(key);
              break;
            case 128:
              this.releaseMidiNote(key);
              break;
            default:
              break;
          }
        };
      });
    });
  }

  static triggerMidiNote(note: number): void {
    // const key = Tone.Midi(note).toNote();
    // this.emitter.emit('triggernote', key);
    // this.currentKeys.push(key);
  }

  static releaseMidiNote(note: number): void {
    // const key = Tone.Midi(note).toNote();

    // this.currentKeys = this.currentKeys.filter((x) => x !== key);
    // this.emitter.emit('triggernoteend', key);
  }

  static dispose() {
    document.removeEventListener('keydown', (e) => this.triggerAttack(e));
    document.removeEventListener('keyup', (e) => this.triggerRelease(e));
  }

  static getIndexFromNote(note: string) {
    return this.notes.findIndex((n) => n === note);
  }

  static triggerAttack(ev: KeyboardEvent): void {
    const note = this.getMappedKey(ev);
    if (!note) return;
    if (this.currentKeys.find((n) => n === note)) return;
    // this.emitter.emit('triggernote', note);
    this.currentKeys.push(note);
  }

  static triggerRelease(ev: KeyboardEvent): void {
    const note = this.getMappedKey(ev);
    if (!note) return;
    this.currentKeys = this.currentKeys.filter((x) => x !== note);
    // this.emitter.emit('triggernoteend', note);
  }

  static getMappedKey(ev: KeyboardEvent): string | undefined {
    switch (ev.keyCode) {
      case Keyboard.KEY_Z:
        return this.notes[0 + this.offSetNote];
      case Keyboard.KEY_S:
        return this.notes[1 + this.offSetNote];
      case Keyboard.KEY_X:
        return this.notes[2 + this.offSetNote];
      case Keyboard.KEY_D:
        return this.notes[3 + this.offSetNote];
      case Keyboard.KEY_C:
        return this.notes[4 + this.offSetNote];
      case Keyboard.KEY_V:
        return this.notes[5 + this.offSetNote];
      case Keyboard.KEY_G:
        return this.notes[6 + this.offSetNote];
      case Keyboard.KEY_B:
        return this.notes[7 + this.offSetNote];
      case Keyboard.KEY_H:
        return this.notes[8 + this.offSetNote];
      case Keyboard.KEY_N:
        return this.notes[9 + this.offSetNote];
      case Keyboard.KEY_J:
        return this.notes[10 + this.offSetNote];
      case Keyboard.KEY_M:
        return this.notes[11 + this.offSetNote];
      case Keyboard.KEY_Q:
        return this.notes[12 + this.offSetNote];
      case Keyboard.KEY_2:
        return this.notes[13 + this.offSetNote];
      case Keyboard.KEY_W:
        return this.notes[14 + this.offSetNote];
      case Keyboard.KEY_3:
        return this.notes[15 + this.offSetNote];
      case Keyboard.KEY_E:
        return this.notes[16 + this.offSetNote];
      case Keyboard.KEY_R:
        return this.notes[17 + this.offSetNote];
      case Keyboard.KEY_5:
        return this.notes[18 + this.offSetNote];
      case Keyboard.KEY_T:
        return this.notes[19 + this.offSetNote];
      case Keyboard.KEY_6:
        return this.notes[20 + this.offSetNote];
      case Keyboard.KEY_Y:
        return this.notes[21 + this.offSetNote];
      case Keyboard.KEY_7:
        return this.notes[22 + this.offSetNote];
      case Keyboard.KEY_U:
        return this.notes[23 + this.offSetNote];
      default:
        break;
    }
  }
}
