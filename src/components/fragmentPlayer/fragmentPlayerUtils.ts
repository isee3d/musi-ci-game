import { Note } from "@prisma/client";
import { msToTicks, ticksToMS } from "~/components/fragmentPlayer/audio/audioUtils";
import { KeyboardToNote } from "~/components/fragmentPlayer/audio/Keyboard";
import * as THREE from 'three';
import { NotePositionTime } from "~/components/fragmentPlayer/fragmentPlayer";

export const getNotesPositions = (notes: Note[], width: number, height: number, linewidth: number) => {
    const range = KeyboardToNote.octaves * 12;
    const noteHeight = height / range;

    if (notes.length === 0) return [];

    const padding = width * 0.1; // 10% padding
    const adjustedWidth = width - 2 * padding;

    const sceneDuration = notes.reduce((max, note) => Math.max(max, note.time + note.duration), 0);
    const pxPerTick = adjustedWidth / msToTicks(sceneDuration);

    const noteLines: NotePositionTime[] = [];
    notes.forEach(note => {
        const startX = msToTicks(note.time) * pxPerTick;
        const endX = startX + (msToTicks(note.duration) * pxPerTick);
        const yIndex = KeyboardToNote.getIndexFromNote(note.name);
        const noteY = yIndex * noteHeight - height / 2;
        const line: NotePositionTime = {
            position: [
                new THREE.Vector3(startX, noteY, 0),
                new THREE.Vector3(endX - linewidth, noteY, 0),
            ],
            time: ticksToMS(note.duration),
        }
        noteLines.push(line);
    });

    return noteLines;
}
