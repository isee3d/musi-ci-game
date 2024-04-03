import { Note } from "@prisma/client";

export interface FragmentWithNotes {
  id: number
  notes: Note[]
  name: string
  description?: string | null | undefined
  useAlways?: boolean | null | undefined
  octave?: number
  transpose?: string
}

export interface FragmentWithNotesAndWeight extends FragmentWithNotes {
    weight: number;
    octave?: number;
    transpose?: string;
}
