import { Note } from 'types/Note';
import { create } from 'zustand';
import { api } from "~/utils/api";
import { mountStoreDevtool } from 'simple-zustand-devtools';

type NoteState = {
  notes: Note[];
  addNewNote: (newNote: Note) => void;
};

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  addNewNote: (newNote) => {
    // if(createdNote?.data){
      set((state) => ({ notes: [...state.notes, newNote] }));
    // }
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('NoteStore', useNoteStore);
}
