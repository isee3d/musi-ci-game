import { mountStoreDevtool } from 'simple-zustand-devtools';
import { FragmentSceneData, Scene } from './../../../types/SceneData';
import { create } from "zustand";

type LuisterenState = {
    startTime: number;
    endTime: number;
    timePlayed: number;
    score: number;
    level: string;
    subLevel: string;
    mode: string;
    allPlayedScenes: Scene[];
    sceneData: Scene;
};

type LuisterenActions = {
    setLevelSublevelMode: (level: string, subLevel: string, mode: string) => void;
    addScore: (score: number) => void;
    addScene: (scene: Scene) => void;
    setTimePlayed: (time: number) => void;
    addRelistenFragment: (fragmentId: number) => void;
    AddSceneData: (items: FragmentSceneData[]) => void;
    setStartTime: (time: number) => void;
    setEndTime: (time: number) => void;
    resetSceneRelatedData: () => void;
    getRelistenCounts: () => { [key: number]: number };
    reset: () => void;
};

const initialState: LuisterenState = {
    startTime: 0,
    endTime: 0,
    timePlayed: 0,
    score: 0,
    level: '',
    subLevel: '',
    mode: '',
    sceneData: {},
    allPlayedScenes: [],
};

const initialRoundState: Partial<LuisterenState> = {
    sceneData: {},
}

// TODO: Add saveToDB action that then only resets a certain part of the store

export const useLuisterenStore = create<LuisterenState & LuisterenActions>((set, get) => ({
    timePlayed: 0,
    score: 0,
    startTime: 0,
    endTime: 0,
    level: '',
    subLevel: '',
    mode: '',
    sceneData: {},
    allPlayedScenes: [],
    addScene: (scene: Scene) => set((state) => ({ allPlayedScenes: [...state.allPlayedScenes, scene] })),
    AddSceneData: (items: FragmentSceneData[]) => set((state) => {
        const newScene = { ...state.sceneData };
        newScene.fragments = items;
        return { sceneData: newScene };
    }),
    addRelistenFragment: (fragmentId: number) => set((state) => {
        const newScene = { ...state.sceneData };
        if (newScene.relistenfragments) {
            newScene.relistenfragments.push(fragmentId);
        } else {
            newScene.relistenfragments = [fragmentId];
        }
        return { sceneData: newScene };
    }),
    addScore: (score: number) => set((state) => ({ score: state.score + score })),
    setStartTime: (time: number) => set((state) => ({ startTime: time })),
    setEndTime: (time: number) => set((state) => ({ endTime: time })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    setLevelSublevelMode: (level: string, subLevel: string, mode: string) =>
        set((state) => ({ level, subLevel, mode })),
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
    mountStoreDevtool('LuisterenStore', useLuisterenStore);
}
