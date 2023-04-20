import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import Sampler from '~/components/fragmentPlayer/audio/Sampler';
import useSampler from '~/components/fragmentPlayer/audio/useSampler';

type AudioServiceState = {
    audioContext: AudioContext | undefined
    piano: Sampler | undefined
    soundBoard: Sampler | undefined
    audioTime: number
    BPM: number
    PPQ: number
    hasSupport: boolean
};

type AudioserviceAction = {
    init: () => Promise<void>;
    setAudioContext: (audioContext: AudioContext) => void;
    getCurrentTime: () => number;
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
    hasSupport: true,
    audioContext: undefined,
    piano: undefined,
    soundBoard: undefined,
    setAudioContext: (audioContext: AudioContext) => set({ audioContext }),
    setAudioTime: (audioTime: number) => set({ audioTime }),
    setPiano: (piano: Sampler) => set({ piano }),
    setSoundBoard: (soundBoard: Sampler) => set({ soundBoard }),
    getCurrentTime: () => {
        const audioContext = get().audioContext;
        return audioContext?.currentTime || 0;
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
    init: async () => {
        const audioContext = get().audioContext;
        if (audioContext) return;
        try {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    const audioContext = new AudioContext();
                    set({ audioContext });
                    const audioTime = audioContext.currentTime;
                    set({ audioTime });
                    const piano = await new Sampler([
                        { note: 'C5', path: '/media/sampler/Salamander/C5.mp3' },
                        { note: 'C4', path: '/media/sampler/Salamander/C4.mp3' },
                        { note: 'C3', path: '/media/sampler/Salamander/C3.mp3' },
                        { note: 'C2', path: '/media/sampler/Salamander/C2.mp3' },
                    ]);

                    set({ piano });

                    const soundBoard = await new Sampler([
                        { note: 'C6', path: '/media/sampler/soundboard/tick_high.mp3' },
                        { note: 'C5', path: '/media/sampler/soundboard/tick_low.mp3' },
                    ]);

                    set({ soundBoard });
                    return resolve();
                }, 1000);
            });
        } catch (e) {
            alert('Web Audio API not supported in this browser.');
            set({ hasSupport: false });
        }
    },
}));

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('NoteStore', useAudioServiceStore);
}
