import { Note } from '@prisma/client';
// import * as Tone from 'tone';
import { baseNotes } from '~/components/fragmentPlayer/audio/Keyboard';
import { ToneIdPart } from '~/components/fragmentPlayer/audioService-legacy/ToneIdPart';
import { FragmentToPlay, FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import Sampler from '~/components/fragmentPlayer/audio/Sampler';

export default class ToneJSUtils {
  // not used
  public static snapNotes(recorded: Note[]) {
    // const stepSize = Tone.Transport.PPQ;

    // for (let i = 0; i < recorded.length; i += 1) {
    //   const note = recorded[i];
    //   if (!note) continue;
    //   const rounded = Math.round(note.time / stepSize) * stepSize;

    //   const roundedDur = Math.round(note.duration / stepSize) * stepSize;
    //   note.time = rounded;
    //   note.duration = roundedDur || stepSize;
    // }
    // return recorded;
  }

  public static getFragmentDurationInMS(notes: Note[]) {
    // return Tone.Ticks(ToneJSUtils.getFragmentDurationInTicks(notes)).toMilliseconds();
  }

  public static getFragmentDurationInTicks(notes: Note[]) {
    if (notes.length === 0) return 0;
    const lastNote = notes.sort((a, b) => b.time + b.duration - (a.time + a.duration))[0] as Note;
    // return Tone.Ticks(lastNote.time + lastNote.duration).valueOf();
  }

  // not used
  public static fragmentToPart(fragment: FragmentWithNotes, sampler: Sampler) {
    const { notes, id } = fragment;
    const partNotes = notes.map((e: any) => {
      return {
        note: e.note,
        // dur: e.dur === -1 ? '0:1' : Tone.Ticks(e.dur).toBarsBeatsSixteenths(),
        // time: Tone.Ticks(e.time).toBarsBeatsSixteenths(),
        velocity: e.velocity || 1,
        callback: e.callback,
      };
    });

    const duration = this.getFragmentDurationInMS(notes);

    // const part = new ToneIdPart(
    //   id.toString(),
    //   duration,
    //   undefined,
    //   (t, event) => {
    //     // if (id !== 'metronome' && process.env.NODE_ENV === 'development') {
    //     //   console.log(`note = `, event.note, t);
    //     // }
    //     // sampler.triggerAttackRelease(event.note, event.dur, t, event.velocity);
    //     if (event.callback) {
    //       event.callback();
    //     }
    //   },
    //   // partNotes
    // );

    // return part;
  }

  /**
   * @param fragments fragments to transpose the given direction
   * @param direction range: -12 to 11. if direction = 0 no transposing is performed
   */
  public static transposeFragments(
    fragments: FragmentToPlay[],
    direction: number
  ): FragmentToPlay[] {
    if (direction === 0) return fragments;
    const helperArray: any = [];
    helperArray.push(...baseNotes, ...baseNotes, ...baseNotes); // 35 items
    const newFragments: FragmentToPlay[] = [];

    for (let i = 0; i < fragments.length; i += 1) {
      const fragment = { ...fragments[i] } as FragmentToPlay;
      const notes: Note[] = [];
      for (let y = 0; y < fragment.notes.length; y++) {
        const n = { ...fragment.notes[y] } as Note;
        const note = n.name.replace(/\d/, '');
        let octave = parseInt(n.name.replace(/\D+/, ''));
        const index = baseNotes.findIndex((no) => no === note) + direction;
        if (index < 0) octave -= 1;
        if (index >= 12) octave += 1;

        const newNote = helperArray[12 + index] + octave;

        n.name = newNote;
        notes.push(n as Note);
      }
      fragment.notes = notes;
      newFragments.push(fragment);
    }
    return newFragments;
  }

  // Not used
  public static addMarginToNote(noteTimeInTicks: number) {
    // const { PPQ } = Tone.Transport;

    // const time = Tone.Ticks(noteTimeInTicks + Math.ceil(PPQ / 60)).toSeconds();
    // const time = Tone.Ticks(noteTimeInTicks).toSeconds();
    // return time;
  }

  // not used
  public static addTimeoutToPart = (part: ToneIdPart, callback?: () => void): ToneIdPart => {
    console.log('part add timeOut', part.id, part.timeout, part.durationInMs);
    part.timeout = setTimeout(() => {
      if (part.timeout) {
        clearTimeout(part.timeout);
        part.timeout = undefined;
      }

      if (callback) callback();
    }, part.durationInMs);

    return part;
  };
}
