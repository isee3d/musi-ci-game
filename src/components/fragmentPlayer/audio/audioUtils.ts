import AudioService from "~/components/fragmentPlayer/audio/AudioService";

const MS_PER_MINUTE = 1000 * 60;

export function beatLengthInMs(): number {
    return MS_PER_MINUTE / AudioService.bpm;
}

export function ticksToMS(ticks: number): number {
    return (ticks / AudioService.PPQ / AudioService.bpm) * 1000 * 60;
}

export function msToTicks(ms: number): number {
     return (ms / MS_PER_MINUTE) * AudioService.PPQ * AudioService.bpm;
}
