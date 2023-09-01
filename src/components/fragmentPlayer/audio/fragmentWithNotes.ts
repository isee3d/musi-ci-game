import { Note } from "@prisma/client";

export interface FragmentWithNotes {
    id: number;
    notes: Note[];
    name: string;
    description?: string | null | undefined;
    useAlways?: boolean | null | undefined;
}

export type FragmentWithNotesAndTransposeDirection = FragmentWithNotes & { transpose: number, octave: 0 | 1 | 2 };

export interface FragmentToPlay extends FragmentWithNotes {
    mute: boolean;
}
