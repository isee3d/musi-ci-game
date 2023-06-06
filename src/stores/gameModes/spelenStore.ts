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
    sceneData: Scene;
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
    sceneData: {},
};

const initialRoundState: Partial<SpelenState> = {
    sceneData: {},
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
    sceneData: {},
    AddSceneData: (items: FragmentSceneData[]) => set((state) => {
        const newScene = { ...state.sceneData };
        newScene.fragments = items;
        return { sceneData: newScene };
    }),
    setChosenFragment: (fragmentId: number) => set((state) => {
        const newScene = { ...state.sceneData };
        newScene.chosenFragment = fragmentId;
        return { sceneData: newScene };
    }),
    setChosenFragmentLatency: (latency: number) => set((state) => {
        const newScene = { ...state.sceneData };
        newScene.chosenFragmentlatency = latency;
        return { sceneData: newScene };
    }),
    addRelistenFragment: (fragmentId: number) => set((state) => {
        const newScene = { ...state.sceneData };
        newScene.relistenfragments?.push(fragmentId);
        return { sceneData: newScene };
    }),
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
        const { sceneData } = get();
        if (!sceneData || !sceneData.relistenfragments) {
            return {};
        }

        return sceneData.relistenfragments.reduce<{ [key: number]: number }>((counts, id) => {
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
