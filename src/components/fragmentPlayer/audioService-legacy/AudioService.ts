import Sampler from './Sampler';

export default class AudioService {
  static audioContext: AudioContext;

  static audioTime: number;

  /** unused atm */
  static scheduleAheadMs = 100;

  public static bpm = 60;

  public static PPQ = 120;

  static hasSupport: boolean;

  static piano: Sampler;

  static soundBoard: Sampler;

  static getCurrentTime(): number {
    return this.audioContext.currentTime;
  }

  static async init(): Promise<void> {
    try {
      return new Promise((resolve) => {
        setTimeout(async () => {
          window.AudioContext = window.AudioContext || window.webkitAudioContext;
          this.audioContext = new AudioContext();
          this.audioTime = this.audioContext.currentTime;
          this.piano = await new Sampler([
            { note: 'C5', path: '/media/sampler/Salamander/C5.mp3' },
            { note: 'C4', path: '/media/sampler/Salamander/C4.mp3' },
            { note: 'C3', path: '/media/sampler/Salamander/C3.mp3' },
            { note: 'C2', path: '/media/sampler/Salamander/C2.mp3' },
          ]);
          this.soundBoard = await new Sampler([
            { note: 'C6', path: '/media/sampler/soundboard/tick_high.mp3' },
            { note: 'C5', path: '/media/sampler/soundboard/tick_low.mp3' },
          ]);
          return resolve();
        }, 1000);
      });
    } catch (e) {       
      this.hasSupport = false;
      alert('Web Audio API not supported in this browser.');
    }
  }
}
