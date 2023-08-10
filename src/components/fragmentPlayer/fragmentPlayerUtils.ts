import { Note } from "@prisma/client";
import { KeyboardToNote } from "~/components/fragmentPlayer/audio/Keyboard";
import * as THREE from 'three';
import { NotePositionTime } from "~/components/fragmentPlayer/animationPlayer";
import { useAudioServiceStore } from "~/stores/useAudioServiceStore";

export const getNotesPositions = (notes: Note[], width: number, height: number, linewidth: number) => {
    const { msToTicks, ticksToMS } = useAudioServiceStore.getState();
    const range = KeyboardToNote.octaves * 12;
    const noteHeight = height / range * 8;

    if (notes.length === 0) return [];

    // Calculate the average note index
    const avgNoteIndex = notes.reduce((sum, note) =>
        sum + KeyboardToNote.getIndexFromNote(note.name), 0) / notes.length;
    const centerYCorrection = (height / 2) - (avgNoteIndex * noteHeight);

    // 10% padding
    const padding = width * 0.1;
    const adjustedWidth = width - 2 * padding;

    const sceneDuration = notes.reduce((max, note) => Math.max(max, note.time + note.duration), 0);
    const pxPerTick = adjustedWidth / msToTicks(sceneDuration);

    const noteLines: NotePositionTime[] = [];
    notes.forEach(note => {
        const startX = msToTicks(note.time) * pxPerTick + 15;
        const endX = startX + (msToTicks(note.duration) * pxPerTick) - 15;
        const yIndex = KeyboardToNote.getIndexFromNote(note.name);
        const noteY = yIndex * noteHeight - height / 2 + centerYCorrection;
        const line: NotePositionTime = {
            position: [
                new THREE.Vector3(startX, noteY, 0),
                new THREE.Vector3(endX - linewidth, noteY, 0),
            ],
            time: ticksToMS(note.duration),
        }
        noteLines.push(line);
    });

    noteLines.sort((a, b) => {
        if (a.position[0] !== undefined && b.position[0] !== undefined) {
            return a.position[0]?.x - b.position[0].x;
        }
        return 0;
    });

    return noteLines;
}
