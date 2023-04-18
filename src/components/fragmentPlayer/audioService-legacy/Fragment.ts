import { Note } from "~/components/fragmentPlayer/audioService-legacy/Note";
import { FragmentWithNotes } from "~/components/fragmentPlayer/audioService-legacy/fragmentWithNotes";

export interface Fragment {
  id: string;
  name: string;
  description: string;
  notes: Note[];
}

export interface FragmentToPlay extends FragmentWithNotes {
  mute: boolean;
}
