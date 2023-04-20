// import * as Tone from 'tone';
// import { Part } from 'tone';
// import { TimeObject } from 'tone/build/esm/core/type/Units';

export class ToneIdPart  {
  id: string;

  public timeout?: NodeJS.Timeout;

  public durationInMs: number;

  constructor(
    id: string,
    durationInMS: number,
    timeout?: NodeJS.Timeout,
    // callback?: Tone.ToneEventCallback<any> | undefined,
    value?: any[] | undefined
  ) {
    // super(callback, value);
    this.id = id;
    this.timeout = timeout;
    this.durationInMs = durationInMS;
    // this.loop = false;
  }
}
