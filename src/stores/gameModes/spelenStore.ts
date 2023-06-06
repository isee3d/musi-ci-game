import { mountStoreDevtool } from 'simple-zustand-devtools';
import { ModeData, Scene } from './../../../types/SceneData';
import { FragmentSceneData } from "types/SceneData";
import { create } from "zustand";

type SpelenState = {
    startTime: number;
    endTime: number;
    timePlayed: number;
    answeredCorrectly: number;
    answeredWrong: number;
    level: string;
    subLevel: string;
    mode: string;
    // modeData: ModeData | undefined;
    // here under more advanced stuff
    // chosenFragment: number | undefined;
    // chosenFragmentlatency: number | undefined;
    relistenFragments: number[];
    SceneData: Scene;
};

type SpelenActions = {
    setLevelSublevelMode: (level: string, subLevel: string, mode: string) => void;
    addOneCorrectlyAnswered: () => void;
    addOneWrongAnswered: () => void;
    setTimePlayed: (time: number) => void;
    setStartTime: (time: number) => void;
    setEndTime: (time: number) => void;
    getPercentageCorrectlyAnswered: () => number;
    setChosenFragment: (fragmentId: number) => void;
    setChosenFragmentLatency: (latency: number) => void;
    addRelistenFragment: (fragmentId: number) => void;
    AddSceneData: (items: FragmentSceneData[]) => void;
    getRelistenCounts: () => { [key: number]: number };
    resetSceneRelatedData: () => void;
    reset: () => void;
};

const initialState: SpelenState = {
    startTime: 0,
    endTime: 0,
    timePlayed: 0,
    answeredCorrectly: 0,
    level: '',
    subLevel: '',
    mode: '',
    answeredWrong: 0,
    relistenFragments: [],
    SceneData: {},
};

const initialRoundState: Partial<SpelenState> = {
    relistenFragments: [],
    SceneData: {},
}

export const useSpelenStore = create<SpelenState & SpelenActions>((set, get) => ({
    timePlayed: 0,
    answeredCorrectly: 0,
    answeredWrong: 0,
    modeData: undefined,
    startTime: 0,
    level: '',
    subLevel: '',
    mode: '',
    endTime: 0,
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: {},
    AddSceneData: (items: FragmentSceneData[]) => set((state) => {
        const newScene = { ...state.SceneData };
        newScene.fragments = items;
        return { SceneData: newScene };
    }),
    setChosenFragment: (fragmentId: number) => set((state) => {
        const newScene = { ...state.SceneData };
        newScene.chosenFragment = fragmentId;
        return { SceneData: newScene };
    }),
    setChosenFragmentLatency: (latency: number) => set((state) => {
        const newScene = { ...state.SceneData };
        newScene.chosenFragmentlatency = latency;
        return { SceneData: newScene };
    }),
    addRelistenFragment: (fragmentId: number) => set((state) =>
        ({ relistenFragments: [...state.relistenFragments, fragmentId] })),
    setLevelSublevelMode: (level: string, subLevel: string, mode: string) =>
        set((state) => ({ level, subLevel, mode })),
    addOneCorrectlyAnswered: () => set((state) => ({ answeredCorrectly: state.answeredCorrectly + 1 })),
    addOneWrongAnswered: () => set((state) => ({ answeredWrong: state.answeredWrong + 1 })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    setStartTime: (time: number) => set((state) => ({ startTime: time })),
    setEndTime: (time: number) => set((state) => ({ endTime: time })),
    getPercentageCorrectlyAnswered: () => {
        const { answeredCorrectly, answeredWrong } = get();
        const total = answeredCorrectly + answeredWrong;
        if (total === 0) return 0;
        return Math.round((answeredCorrectly / total) * 100);
    },
    getRelistenCounts: (): { [key: number]: number } => {
        const { relistenFragments } = get();
        return relistenFragments.reduce<{ [key: number]: number }>((counts, id) => {
            counts[id] = (counts[id] || 0) + 1;
            return counts;
        }, {});
    },
    reset: () => set(initialState),
    resetSceneRelatedData: () => set(initialRoundState)
}));

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('SpelenStore', useSpelenStore);
}
