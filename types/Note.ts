export interface Note {
  note: string;
  velocity: number;
  /** start of note in Ticks */
  time: number;
  /** duration in Ticks */
  dur: number;
}
