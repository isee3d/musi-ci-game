import { mountStoreDevtool } from 'simple-zustand-devtools';
import { FormattedData, FragmentSceneData, Scene } from './../../../types/SceneData';
import { create } from "zustand";

type LuisterenState = {
    startTime: number;
    endTime: number;
    timePlayed: number;
    score: number;
    level: number;
    subLevel: number;
    mode: number;
    allPlayedScenes: Scene[];
    sceneData: Scene;
};

type LuisterenActions = {
    setLevelSublevelMode: (level: number, subLevel: number, mode: number) => void;
    getFormattedStoreData: () => FormattedData;
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
    level: 0,
    subLevel: 0,
    mode: 0,
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
    level: 0,
    subLevel: 0,
    mode: 0,
    sceneData: {},
    allPlayedScenes: [],
    addScene: (scene: Scene) => set((state) => ({ allPlayedScenes: [...state.allPlayedScenes, scene] })),
    AddSceneData: (items: FragmentSceneData[]) => set((state) => {
        const newScene = { ...state.sceneData };
        newScene.sceneFragments = items;
        return { sceneData: newScene };
    }),
    addRelistenFragment: (fragmentId: number) => set((state) => {
        const newScene = { ...state.sceneData };
        if (newScene.relistenFragments) {
            newScene.relistenFragments.push(fragmentId);
        } else {
            newScene.relistenFragments = [fragmentId];
        }
        return { sceneData: newScene };
    }),
    addScore: (score: number) => set((state) => ({ score: state.score + score })),
    setStartTime: (time: number) => set((state) => ({ startTime: time })),
    setEndTime: (time: number) => set((state) => ({ endTime: time })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    setLevelSublevelMode: (level: number, subLevel: number, mode: number) =>
        set((state) => ({ level, subLevel, mode })),
    getRelistenCounts: (): { [key: number]: number } => {
        const { sceneData } = get();
        if (!sceneData || !sceneData.relistenFragments) {
            return {};
        }

        return sceneData.relistenFragments.reduce<{ [key: number]: number }>((counts, id) => {
            counts[id] = (counts[id] || 0) + 1;
            return counts;
        }, {});
    },
    getFormattedStoreData: () => {
        const {
            startTime,
            endTime,
            score,
            level,
            subLevel,
            mode,
            allPlayedScenes,
            getRelistenCounts
        } = get();

        const Scenes = allPlayedScenes.map((scene) => {
            const sceneFragments = scene.sceneFragments?.map((fragment) => {
                return {
                    id_fragment: fragment.id_fragment,
                    fragmentIndex: fragment.fragmentIndex,
                    isCorrectFragment: fragment.isCorrectFragment,
                    isPlayedFragment: fragment.isPlayedFragment,
                    groundTone: fragment.groundTone,
                };
            }) ?? [];

            // Use getRelistenCounts to gather and format relistenFragments data
            const relistenCounts = getRelistenCounts();
            const relistenFragments = Object.keys(relistenCounts).map((key) => {
                return {
                    id_fragment: parseInt(key),
                    relistenCount: relistenCounts[parseInt(key)],
                };
            });

            return {
                chosenFragmentLatency: scene.chosenFragmentlatency ?? 0,
                sceneFragments: sceneFragments,
                relistenFragments: relistenFragments,
            };
        });

        return {
            id_User: "1",
            id_level: level,
            id_subLevel: subLevel,
            id_gameMode: mode,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            score: score,
            Scenes: Scenes,
        };
    },
    reset: () => set(initialState),
    resetSceneRelatedData: () => set(initialRoundState)
}));

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('LuisterenStore', useLuisterenStore);
}
