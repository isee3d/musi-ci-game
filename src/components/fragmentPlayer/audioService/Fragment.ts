import { Note } from "~/components/fragmentPlayer/audioService/Note";
import { FragmentWithNotes } from "~/components/fragmentPlayer/audioService/fragmentWithNotes";

export interface Fragment {
  id: string;
  name: string;
  description: string;
  notes: Note[];
}

export interface FragmentToPlay extends FragmentWithNotes {
  mute: boolean;
}
