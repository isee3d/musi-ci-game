import AudioService from "~/components/fragmentPlayer/audioService/AudioService";


export function beatLengthInMs(): number {
  return (60 * 1000) / AudioService.bpm;
}

export function ticksToMS(ticks: number): number {
  return (ticks / AudioService.PPQ / AudioService.bpm) * 1000 * 60;
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
