import { mountStoreDevtool } from 'simple-zustand-devtools';
import { SceneData, ModeData } from './../../../types/SceneData';
import { create } from "zustand";

type LuisterenState = {
    startTime: number;                                                  // done
    endTime: number;                                                    // done
    timePlayed: number;                                                 // done
    score: number;                                                      // semi done
    modeData: ModeData | undefined;                                     // done
    // here under more advanced stuff
    relistenFragments: number[];
    SceneData: SceneData[];
};

type LuisterenActions = {
    addScore: (score: number) => void;
    setTimePlayed: (time: number) => void;
    addRelistenFragment: (fragmentId: number) => void;
    AddSceneDataItem: (item: SceneData) => void;
    AddSceneData: (items: SceneData[]) => void;
    setStartTime: (time: number) => void;
    setEndTime: (time: number) => void;
    setModeData: (data: ModeData) => void;
    resetSceneRelatedData: () => void;
    reset: () => void;
};

const initialState: LuisterenState = {
    startTime: 0,
    endTime: 0,
    timePlayed: 0,
    score: 0,
    modeData: undefined,
    relistenFragments: [],
    SceneData: [],
};

const initialRoundState: Partial<LuisterenState> = {
    relistenFragments: [],
    SceneData: [],
}

// TODO: Add saveToDB action that then only resets a certain part of the store

export const useLuisterenStore = create<LuisterenState & LuisterenActions>((set, get) => ({
    timePlayed: 0,
    score: 0,
    startTime: 0,
    endTime: 0,
    modeData: undefined,
    relistenFragments: [],
    SceneData: [],
    AddSceneData: (items: SceneData[]) => set((state) => ({ SceneData: items })),
    AddSceneDataItem: (item: SceneData) => set((state) => ({ SceneData: [...state.SceneData, item] })),
    setModeData: (data: ModeData) => set((state) => ({ modeData: data })),
    addRelistenFragment: (fragmentId: number) => set((state) =>
        ({ relistenFragments: [...state.relistenFragments, fragmentId] })),
    addScore: (score: number) => set((state) => ({ score: state.score + score })),
    setStartTime: (time: number) => set((state) => ({ startTime: time })),
    setEndTime: (time: number) => set((state) => ({ endTime: time })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    reset: () => set(initialState),
    resetSceneRelatedData: () => set(initialRoundState)
}));

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('LuisterenStore', useLuisterenStore);
}
