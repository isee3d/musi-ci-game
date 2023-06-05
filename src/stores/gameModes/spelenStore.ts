import { modeData } from './../../../types/SceneData';
import { SceneData } from "types/SceneData";
import { create } from "zustand";

type SpelenState = {
    startTime: Date;
    timePlayed: number;
    answeredCorrectly: number;
    answeredWrong: number;
    modeData: modeData | undefined;
    // here under more advanced stuff
    chosenFragment: number | undefined;
    chosenFragmentlatency: number | undefined;
    relistenFragments: number[];
    SceneData: SceneData[];
};

type SpelenActions = {
    addOneCorrectlyAnswered: () => void;
    addOneWrongAnswered: () => void;
    setTimePlayed: (time: number) => void;
    setStartTime: (time: Date) => void;
    getPercentageCorrectlyAnswered: () => number;
    setChosenFragment: (fragmentId: number) => void;
    setChosenFragmentLatency: (latency: number) => void;
    addRelistenFragment: (fragmentId: number) => void;
    AddSceneDataItem: (item: SceneData) => void;
    AddSceneData: (items: SceneData[]) => void;
    setModeData: (data: modeData) => void;
    resetSceneRelatedData: () => void;
    reset: () => void;
};

const initialState: SpelenState = {
    startTime: new Date(),
    timePlayed: 0,
    answeredCorrectly: 0,
    modeData: undefined,
    answeredWrong: 0,
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: [],
};

const initialRoundState: Partial<SpelenState> = {
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: [],
}

export const useSpelenStore = create<SpelenState & SpelenActions>((set, get) => ({
    timePlayed: 0,
    answeredCorrectly: 0,
    answeredWrong: 0,
    modeData: undefined,
    startTime: new Date(),
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: [],
    AddSceneData: (items: SceneData[]) => set((state) => ({ SceneData: items })),
    AddSceneDataItem: (item: SceneData) => set((state) => ({ SceneData: [...state.SceneData, item] })),
    setChosenFragment: (fragmentId: number) => set((state) => ({ chosenFragment: fragmentId })),
    setModeData: (data: modeData) => set((state) => ({ modeData: data })),
    setChosenFragmentLatency: (latency: number) => set((state) => ({ chosenFragmentlatency: latency })),
    addRelistenFragment: (fragmentId: number) => set((state) =>
        ({ relistenFragments: [...state.relistenFragments, fragmentId] })),
    addOneCorrectlyAnswered: () => set((state) => ({ answeredCorrectly: state.answeredCorrectly + 1 })),
    addOneWrongAnswered: () => set((state) => ({ answeredWrong: state.answeredWrong + 1 })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    setStartTime: (time: Date) => set((state) => ({ startTime: time })),
    getPercentageCorrectlyAnswered: () => {
        const { answeredCorrectly, answeredWrong } = get();
        const total = answeredCorrectly + answeredWrong;
        if (total === 0) return 0;
        return Math.round((answeredCorrectly / total) * 100);
    },
    reset: () => set(initialState),
    resetSceneRelatedData: () => set(initialRoundState)
}));
