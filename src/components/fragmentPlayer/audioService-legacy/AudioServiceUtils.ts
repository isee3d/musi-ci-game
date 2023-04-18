import AudioService from "~/components/fragmentPlayer/audioService-legacy/AudioService";

const MS_PER_MINUTE = 1000 * 60;

export function beatLengthInMs(): number {
  return MS_PER_MINUTE / AudioService.bpm;
}

export function ticksToMS(ticks: number): number {
  return (ticks / AudioService.PPQ / AudioService.bpm) * MS_PER_MINUTE;
}

export function msToTicks(ms: number): number {
  return (ms / MS_PER_MINUTE) * AudioService.PPQ * AudioService.bpm;
}

export async function returnAudioBuffer(arrBuffer: ArrayBuffer): Promise<AudioBuffer> {
  return new Promise((resolve: any, reject: any) => {
    AudioService.audioContext.decodeAudioData(
      arrBuffer,
      (buffer) => {
        resolve(buffer);
      },
      (error) => reject(error)
    );
  });
}
