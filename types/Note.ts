export interface Note {
  id?: string;
  note: string;
  velocity: number;
  /** start of note in Ticks */
  time: string;
  /** duration in Ticks */
  dur: number;
}
