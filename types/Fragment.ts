import { Note } from './Note';

export interface Fragment {
  id: string;
  name: string;
  description: string;
  notes: Note[];
}
