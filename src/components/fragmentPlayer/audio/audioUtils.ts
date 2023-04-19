import AudioService from "~/components/fragmentPlayer/audioService-legacy/AudioService";

const MS_PER_MINUTE = 1000 * 60;
const ticksPerQuarterNote = 960;

export function beatLengthInMs(): number {
    return MS_PER_MINUTE / AudioService.bpm;
}

export function ticksToMS(ticks: number): number {
    return (ticks / AudioService.PPQ / AudioService.bpm) * MS_PER_MINUTE;
}

export function ticksToSeconds(ticks: number): number {
    return ticksToMS(ticks) / 1000;
}

export function msToTicks(ms: number): number {
    // return (ms / MS_PER_MINUTE) * AudioService.PPQ * AudioService.bpm;
    const quarterNoteDurationMs = MS_PER_MINUTE / AudioService.bpm;
    const ticks = (ms / quarterNoteDurationMs) * ticksPerQuarterNote;
    return ticks;
}
