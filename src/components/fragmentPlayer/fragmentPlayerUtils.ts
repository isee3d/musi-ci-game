import { Note } from "@prisma/client";
import { getFragmentDurationInSeconds, msToTicks } from "~/components/fragmentPlayer/audio/audioUtils";
import { KeyboardToNote } from "~/components/fragmentPlayer/audioService-legacy/Keyboard";
import * as THREE from 'three';

export const getNotesPositions = (notes: Note[], width: number, height: number): THREE.Vector3[][] => {
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
            new THREE.Vector3(startX, noteY, 0),
            new THREE.Vector3(endX, noteY, 0),
        ];
        noteLines.push(line);
    });

    return noteLines;
}


// const points: THREE.Vector3[] = [
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(96, 0, 0),
// ];

// const points2: THREE.Vector3[] = [
//     new THREE.Vector3(104, -90, 0),
//     new THREE.Vector3(200, -90, 0),
// ];

// const points3: THREE.Vector3[] = [
//     new THREE.Vector3(200, -10, 0),
//     new THREE.Vector3(300, -10, 0),
// ];

// const pointsArray = [points, points2, points3];
