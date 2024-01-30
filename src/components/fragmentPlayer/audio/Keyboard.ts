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

export const pianoNotesMap = new Map([
  ['A0', { noteNumber: 1, weight: 100 }],
  ['A#0', { noteNumber: 2, weight: 100 }],
  ['B0', { noteNumber: 3, weight: 100 }],
  ['C1', { noteNumber: 4, weight: 100 }],
  ['C#1', { noteNumber: 5, weight: 100 }],
  ['D1', { noteNumber: 6, weight: 100 }],
  ['D#1', { noteNumber: 7, weight: 100 }],
  ['E1', { noteNumber: 8, weight: 100 }],
  ['F1', { noteNumber: 9, weight: 100 }],
  ['F#1', { noteNumber: 10, weight: 100 }],
  ['G1', { noteNumber: 11, weight: 100 }],
  ['G#1', { noteNumber: 12, weight: 100 }],
  ['A1', { noteNumber: 13, weight: 100 }],
  ['A#1', { noteNumber: 14, weight: 100 }],
  ['B1', { noteNumber: 15, weight: 100 }],
  ['C2', { noteNumber: 16, weight: 100 }],
  ['C#2', { noteNumber: 17, weight: 100 }],
  ['D2', { noteNumber: 18, weight: 100 }],
  ['D#2', { noteNumber: 19, weight: 100 }],
  ['E2', { noteNumber: 20, weight: 100 }],
  ['F2', { noteNumber: 21, weight: 100 }],
  ['F#2', { noteNumber: 22, weight: 100 }],
  ['G2', { noteNumber: 23, weight: 100 }],
  ['G#2', { noteNumber: 24, weight: 100 }],
  ['A2', { noteNumber: 25, weight: 100 }],
  ['A#2', { noteNumber: 26, weight: 100 }],
  ['B2', { noteNumber: 27, weight: 100 }],
  ['C3', { noteNumber: 28, weight: 100 }],
  ['C#3', { noteNumber: 29, weight: 100 }],
  ['D3', { noteNumber: 30, weight: 100 }],
  ['D#3', { noteNumber: 31, weight: 100 }],
  ['E3', { noteNumber: 32, weight: 100 }],
  ['F3', { noteNumber: 33, weight: 100 }],
  ['F#3', { noteNumber: 34, weight: 100 }],
  ['G3', { noteNumber: 35, weight: 100 }],
  ['G#3', { noteNumber: 36, weight: 100 }],
  ['A3', { noteNumber: 37, weight: 100 }],
  ['A#3', { noteNumber: 38, weight: 100 }],
  ['B3', { noteNumber: 39, weight: 100 }],
  ['C4', { noteNumber: 40, weight: 100 }],
  ['C#4', { noteNumber: 41, weight: 100 }],
  ['D4', { noteNumber: 42, weight: 100 }],
  ['D#4', { noteNumber: 43, weight: 100 }],
  ['E4', { noteNumber: 44, weight: 100 }],
  ['F4', { noteNumber: 45, weight: 100 }],
  ['F#4', { noteNumber: 46, weight: 100 }],
  ['G4', { noteNumber: 47, weight: 100 }],
  ['G#4', { noteNumber: 48, weight: 100 }],
  ['A4', { noteNumber: 49, weight: 100 }],
  ['A#4', { noteNumber: 50, weight: 100 }],
  ['B4', { noteNumber: 51, weight: 100 }],
  ['C5', { noteNumber: 52, weight: 100 }],
  ['C#5', { noteNumber: 53, weight: 100 }],
  ['D5', { noteNumber: 54, weight: 100 }],
  ['D#5', { noteNumber: 55, weight: 100 }],
  ['E5', { noteNumber: 56, weight: 100 }],
  ['F5', { noteNumber: 57, weight: 100 }],
  ['F#5', { noteNumber: 58, weight: 100 }],
  ['G5', { noteNumber: 59, weight: 100 }],
  ['G#5', { noteNumber: 60, weight: 100 }],
  ['A5', { noteNumber: 61, weight: 100 }],
  ['A#5', { noteNumber: 62, weight: 100 }],
  ['B5', { noteNumber: 63, weight: 100 }],
  ['C6', { noteNumber: 64, weight: 100 }],
  ['C#6', { noteNumber: 65, weight: 100 }],
  ['D6', { noteNumber: 66, weight: 100 }],
  ['D#6', { noteNumber: 67, weight: 100 }],
  ['E6', { noteNumber: 68, weight: 100 }],
  ['F6', { noteNumber: 69, weight: 100 }],
  ['F#6', { noteNumber: 70, weight: 100 }],
  ['G6', { noteNumber: 71, weight: 100 }],
  ['G#6', { noteNumber: 72, weight: 100 }],
  ['A6', { noteNumber: 73, weight: 100 }],
  ['A#6', { noteNumber: 74, weight: 100 }],
  ['B6', { noteNumber: 75, weight: 100 }],
  ['C7', { noteNumber: 76, weight: 100 }],
  ['C#7', { noteNumber: 77, weight: 100 }],
  ['D7', { noteNumber: 78, weight: 100 }],
  ['D#7', { noteNumber: 79, weight: 100 }],
  ['E7', { noteNumber: 80, weight: 100 }],
  ['F7', { noteNumber: 81, weight: 100 }],
  ['F#7', { noteNumber: 82, weight: 100 }],
  ['G7', { noteNumber: 83, weight: 100 }],
  ['G#7', { noteNumber: 84, weight: 100 }],
  ['A7', { noteNumber: 85, weight: 100 }],
  ['A#7', { noteNumber: 86, weight: 100 }],
  ['B7', { noteNumber: 87, weight: 100 }],
  ['C8', { noteNumber: 88, weight: 100 }],
])

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
