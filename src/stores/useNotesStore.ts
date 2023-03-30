import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Note } from '@prisma/client';

type NoteState = {
  notes: Note[];
  addNewNote: (newNote: Note) => void;
  resetNotes: () => void;
};

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  addNewNote: (newNote) => {
    // if(createdNote?.data){
      set((state) => ({ notes: [...state.notes, newNote] }));
    // }
  },
  resetNotes: () => set({ notes: [] }),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('NoteStore', useNoteStore);
}
