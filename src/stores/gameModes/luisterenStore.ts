import { SceneData, ModeData } from './../../../types/SceneData';
import { create } from "zustand";

type LuisterenState = {
    startTime: number;
    timePlayed: number;
    score: number;
    modeData: ModeData | undefined;
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
    setStartTime: (time: number) => void;
    setModeData: (data: ModeData) => void;
    resetSceneRelatedData: () => void;
    reset: () => void;
};

const initialState: LuisterenState = {
    startTime: 0,
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
    startTime: 0,
    modeData: undefined,
    chosenFragment: undefined,
    chosenFragmentlatency: undefined,
    relistenFragments: [],
    SceneData: [],
    AddSceneData: (items: SceneData[]) => set((state) => ({ SceneData: items })),
    AddSceneDataItem: (item: SceneData) => set((state) => ({ SceneData: [...state.SceneData, item] })),
    setChosenFragment: (fragmentId: number) => set((state) => ({ chosenFragment: fragmentId })),
    setChosenFragmentLatency: (latency: number) => set((state) => ({ chosenFragmentlatency: latency })),
    setModeData: (data: ModeData) => set((state) => ({ modeData: data })),
    addRelistenFragment: (fragmentId: number) => set((state) =>
        ({ relistenFragments: [...state.relistenFragments, fragmentId] })),
    addScore: (score: number) => set((state) => ({ score: state.score + score })),
    setStartTime: (time: number) => set((state) => ({ startTime: time })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    reset: () => set(initialState),
    resetSceneRelatedData: () => set(initialRoundState)
}));
