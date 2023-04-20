// import * as Tone from 'tone';

import Sampler from "~/components/fragmentPlayer/audio/Sampler";

export class SoundboardSampler {
  static current: Sampler;

  static init(): Sampler {
    // this.current = new Sampler({
    //   urls: {
    //     C5: 'tick_low.mp3', // metronome
    //     C6: 'tick_high.mp3', // metronome
    //     C4: '3x_sine_c5.mp3', // metronome
    //     D4: '3x_sine_c6.mp3', // metronome
    //   },
    //   baseUrl: '/media/sampler/soundboard/',
    // }).toDestination();
    return this.current;
  }
}
