import { Note } from "@prisma/client";
import AudioService from "~/components/fragmentPlayer/audioService-legacy/AudioService";

const MS_PER_MINUTE = 1000 * 60;
const ticksPerQuarterNote = 960;

export function getFragmentDurationinMS(notes: Note[]): number {
    if(notes.length === 0) return 0;
    const lastNote = notes.sort((a, b) => b.time + b.duration - (a.time + a.duration))[0] as Note;
    return ticksToMS(lastNote.time + lastNote.duration);
}

export function getFragmentDurationInSeconds(notes: Note[]): number {
    if(notes.length === 0) return 0;
    const lastNote = notes.sort((a, b) => b.time + b.duration - (a.time + a.duration))[0] as Note;
    return ticksToSeconds(lastNote.time + lastNote.duration);
}

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
