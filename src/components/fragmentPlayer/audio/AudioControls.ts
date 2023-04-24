import { Note } from "@prisma/client";
import { FragmentWithNotes } from "~/components/fragmentPlayer/audio/fragmentWithNotes";
import { useAudioServiceStore } from "~/stores/useAudioServiceStore";

export function start(fragment: FragmentWithNotes) {
    const { piano, setActiveFragment, ticksToMS } = useAudioServiceStore.getState();

    if(!piano) return;

    fragment.notes.forEach((note: Note) => {
        piano.play({
            note: note.name,
            sustain: 500,
            releaseMs: ticksToMS(note.duration),
            volume: note.speed,
            delay: ticksToMS(note.time),
        });
    });

    setActiveFragment(fragment);
}

export const initializeSound = async () => {
    const { piano } = useAudioServiceStore.getState();
    await piano?.play({ note: 'C4', volume: 1, sustain: 400, releaseMs: 1000 });
    await piano?.play({
      note: 'C5',
      volume: 1,
      sustain: 400,
      releaseMs: 1000,
      delay: 300,
    });
}
