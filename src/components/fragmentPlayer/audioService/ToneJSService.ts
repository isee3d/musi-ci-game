
import * as Tone from 'tone';
import { ticksToMS } from '~/components/fragmentPlayer/audioService/AudioServiceUtils';
import AudioService from '~/components/fragmentPlayer/audioService/AudioService';
import { SoundboardSampler } from '~/components/fragmentPlayer/audioService/SoundboardSampler';
import { PianoSampler } from '~/components/fragmentPlayer/audioService/PianoSampler';
import { ToneIdPart } from '~/components/fragmentPlayer/audioService/ToneIdPart';
import ToneJSUtils from '~/components/fragmentPlayer/audioService/ToneJSUtils';
// import { Note } from '~/components/fragmentPlayer/audioService/Note';
import { Fragment } from '~/components/fragmentPlayer/audioService/Fragment';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audioService/fragmentWithNotes';
import { Note } from '@prisma/client';

export type ToneJSStatus = 'started' | 'stopped' | 'paused' | 'metronome';

export interface ToneStartOptions {
  metronome?: boolean;
  callbackAfterMetroNome?: () => void;
  callbackAfterNote?: (fragment: Fragment, note: Note) => void;
}
export class ToneJSService {
  private static parts: ToneIdPart[] = [];

  private static metronomePart: ToneIdPart;

  private static status: ToneJSStatus = 'stopped';

  private static currentFragment?: FragmentWithNotes;

  private static timeOutList: { id: string; timeout?: NodeJS.Timeout }[] = [];

  static audioContext: Tone.BaseContext;

  static getAudioTime(): number {
    return this.audioContext.currentTime;
  }

  static hasSupport: boolean;

  public static async init(): Promise<void> {
    Tone.Transport.loop = false;
    try {
      this.audioContext = Tone.getContext();

      Tone.setContext(this.audioContext);
      await PianoSampler.init();
      await SoundboardSampler.init();
    } catch (e) {
      this.hasSupport = false;
      alert('Web Audio API not supported in this browser.');
    }
  }

  public static getStatus(): ToneJSStatus {
    return this.status;
  }

  public static getCurrentFragment(): FragmentWithNotes | undefined {
    return this.currentFragment;
  }

  public static metronomeCallback: (index: number) => void;

  static async start(fragment: FragmentWithNotes): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (Tone.Transport.state === 'closed' || Tone.Transport.state === 'suspended') {
      await Tone.start();
    }

    this.status = 'started';

    for (let i = 0; i < fragment.notes.length; i += 1) {
      const n = fragment.notes[i];
      if (!n) continue;
      AudioService.piano.play({
        note: n.name,
        sustain: 500,
        releaseMs: ticksToMS(n.duration),
        volume: n.speed,
        delay: ticksToMS(n.time),
      });
    }

    this.currentFragment = fragment;

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        this.stop();
        resolve();
      }, ToneJSUtils.getFragmentDurationInMS(fragment.notes));
      this.timeOutList.push({ id: fragment.id.toString(), timeout });
    });
  }

  public static stop(): void {

    this.status = 'stopped';
    this.currentFragment = undefined;
    this.timeOutList.forEach((t) => {
      if (t.timeout) clearTimeout(t.timeout);
    });
    this.timeOutList.splice(0, this.timeOutList.length);
  }

  static pause(): void {
    Tone.Transport.pause();
    this.status = 'paused';
  }

  static resume(): void {
    Tone.Transport.start('+0.05');
    this.status = 'started';
  }

  static async startMetronome(callbackOnNote: (n: number) => void): Promise<void> {
    if (Tone.Transport.state === 'stopped') {
      await Tone.start();
    }
    this.currentFragment = undefined;

    this.status = 'metronome';

    const { PPQ } = Tone.Transport;
    const notes: Note[] = [];
    // const notes: Note[] = [
    //   { time: 0, name: 'C6', speed: 0.34, duration: PPQ },
    //   { time: PPQ * 1, name: 'C5', velocity: 0.34, dur: 1 * PPQ },
    //   { time: PPQ * 2, name: 'C5', velocity: 0.34, dur: 1 * PPQ },
    //   { time: PPQ * 3, note: 'C5', velocity: 0.34, dur: 1 * PPQ },
    //   // { time: PPQ * 3, note: 'C5', velocity: 1, dur: 1 * PPQ },
    // ];

    const now = this.getAudioTime();

    for (let i = notes.length - 1; i >= 0; i -= 1) {
      const n = notes[i];
      if (!n) continue;
      const t = now + Tone.Ticks(n.time).toSeconds();

      AudioService.soundBoard.play({
        note: n.name,
        sustain: 500,
        releaseMs: ticksToMS(n.duration),
        volume: n.speed,
        delay: ticksToMS(n.time),
      });

      Tone.Draw.schedule(() => {
        callbackOnNote(notes.length - i - 1);
      }, t);
    }

    Tone.Transport.start();

    return new Promise((resolve) => {
      setTimeout(() => {
        this.stop();
        resolve();
      }, ToneJSUtils.getFragmentDurationInMS(notes));
    });
  }
}
