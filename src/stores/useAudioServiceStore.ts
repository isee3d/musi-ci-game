import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import Sampler from './Sampler';

type AudioServiceState = {
    audioContext: AudioContext | undefined
    piano: Sampler | undefined
    soundBoard: Sampler | undefined
    audioTime: number
    BPM: number
    PPQ: number
};

type AudioserviceAction = {
    setAudioContext: (audioContext: AudioContext) => void;
    getCurrentTime: () => number | undefined;
    setAudioTime: (audioTime: number) => void;
    setPiano: (piano: Sampler) => void;
    setSoundBoard: (soundBoard: Sampler) => void;
    beatLengthInMs: () => number;
    ticksToMS: (ticks: number) => number;
    returnAudioBuffer: (arrBuffer: ArrayBuffer) => Promise<AudioBuffer>;
};

export const useAudioServiceStore = create<AudioServiceState & AudioserviceAction>((set, get) => ({
    audioTime: 0,
    BPM: 60,
    PPQ: 120,
    audioContext: undefined,
    piano: undefined,
    soundBoard: undefined,
    setAudioContext: (audioContext: AudioContext) => set({ audioContext }),
    setAudioTime: (audioTime: number) => set({ audioTime }),
    setPiano: (piano: Sampler) => set({ piano }),
    setSoundBoard: (soundBoard: Sampler) => set({ soundBoard }),
    getCurrentTime: () => {
        const audioContext = get().audioContext;
        return audioContext?.currentTime;
    },
    beatLengthInMs: () => {
        return (60 * 1000) / get().BPM;
    },
    ticksToMS: (ticks: number) => {
        return (ticks / get().PPQ / get().BPM) * 1000 * 60;
    },
    returnAudioBuffer: async (arrBuffer: ArrayBuffer) => {
        const audioContext = get().audioContext;
        return new Promise((resolve, reject) => {
            audioContext?.decodeAudioData(
                arrBuffer,
                (buffer) => {
                    resolve(buffer);
                },
                (error) => reject(error)
            );
        });
    },
}))

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('NoteStore', useAudioServiceStore);
}
