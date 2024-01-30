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

export class KeyboardToNote {
  static octaves = 5;
  static notes: string[] = generatePianoNotes();

  static getIndexFromNote(note: string) {
    return this.notes.findIndex((n) => n === note);
  }
}
