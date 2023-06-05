import { SceneData, modeData } from './../../../types/SceneData';
import { create } from "zustand";

type LuisterenState = {
    startTime: Date;
    timePlayed: number;
    score: number;
    modeData: modeData | undefined;
    // here under more advanced stuff
    chosenFragment: number | undefined;
    chosenFragmentlatency: number | undefined;
    relistenFragments: number[];
    SceneData: SceneData[];
};

type LuisterenActions = {
    addScore: (score: number) => void;
    setTimePlayed: (time: number) => void;
    setChosenFragment: (fragmentId: number) => void;
    setChosenFragmentLatency: (latency: number) => void;
    addRelistenFragment: (fragmentId: number) => void;
    AddSceneDataItem: (item: SceneData) => void;
    AddSceneData: (items: SceneData[]) => void;
    setStartTime: (time: Date) => void;
    setModeData: (data: modeData) => void;
    resetSceneRelatedData: () => void;
    reset: () => void;
};

const initialState: LuisterenState = {
    startTime: new Date(),
    timePlayed: 0,
    score: 0,
    modeData: undefined,
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: [],
};

const initialRoundState: Partial<LuisterenState> = {
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: [],
}

// TODO: Add saveToDB action that then only resets a certain part of the store

export const useLuisterenStore = create<LuisterenState & LuisterenActions>((set, get) => ({
    timePlayed: 0,
    score: 0,
    startTime: new Date(),
    modeData: undefined,
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: [],
    AddSceneData: (items: SceneData[]) => set((state) => ({ SceneData: items })),
    AddSceneDataItem: (item: SceneData) => set((state) => ({ SceneData: [...state.SceneData, item] })),
    setChosenFragment: (fragmentId: number) => set((state) => ({ chosenFragment: fragmentId })),
    setChosenFragmentLatency: (latency: number) => set((state) => ({ chosenFragmentlatency: latency })),
    setModeData: (data: modeData) => set((state) => ({ modeData: data })),
    addRelistenFragment: (fragmentId: number) => set((state) =>
        ({ relistenFragments: [...state.relistenFragments, fragmentId] })),
    addScore: (score: number) => set((state) => ({ score: state.score + score })),
    setStartTime: (time: Date) => set((state) => ({ startTime: time })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    reset: () => set(initialState),
    resetSceneRelatedData: () => set(initialRoundState)
}));
