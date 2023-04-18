import * as Tone from 'tone';

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

  static emitter = new Tone.Emitter();

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
    const key = Tone.Midi(note).toNote();
    this.emitter.emit('triggernote', key);
    this.currentKeys.push(key);
  }

  static releaseMidiNote(note: number): void {
    const key = Tone.Midi(note).toNote();

    this.currentKeys = this.currentKeys.filter((x) => x !== key);
    this.emitter.emit('triggernoteend', key);
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
    this.emitter.emit('triggernote', note);
    this.currentKeys.push(note);
  }

  static triggerRelease(ev: KeyboardEvent): void {
    const note = this.getMappedKey(ev);
    if (!note) return;
    this.currentKeys = this.currentKeys.filter((x) => x !== note);
    this.emitter.emit('triggernoteend', note);
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
