import { Note } from "@prisma/client";
import { getFragmentDurationInSeconds, msToTicks } from "~/components/fragmentPlayer/audio/audioUtils";
import { KeyboardToNote } from "~/components/fragmentPlayer/audioService-legacy/Keyboard";
import * as THREE from 'three';

export const getNotesPositions = (notes: Note[], width: number, height: number, linewidth: number) => {
        const range = KeyboardToNote.octaves * 12;
        const noteHeight = height / range;

        if (notes.length === 0) return [];

        const sceneDuration = getFragmentDurationInSeconds(notes);
        const pxPerTick = width / sceneDuration;
        const noteLines: THREE.Vector3[][] = [];
        notes.forEach(note => {
            const startX = msToTicks(note.time / 25) * pxPerTick;
            const endX = startX + (msToTicks(note.duration / 25) * pxPerTick);
            const yIndex = KeyboardToNote.getIndexFromNote(note.name);
            const noteY = yIndex * noteHeight - height / 2;
            const line: THREE.Vector3[] = [
                new THREE.Vector3(startX , noteY, 0),
                new THREE.Vector3(endX - linewidth, noteY, 0),
            ];
            noteLines.push(line);
        });
        console.log(noteLines)
        return noteLines;
    }
