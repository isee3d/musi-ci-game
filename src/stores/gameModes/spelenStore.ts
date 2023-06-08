import { mountStoreDevtool } from 'simple-zustand-devtools';
import { FormattedData, Scene } from './../../../types/SceneData';
import { FragmentSceneData } from "types/SceneData";
import { create } from "zustand";

type SpelenState = {
    startTime: number;
    endTime: number;
    timePlayed: number;
    level: number;
    subLevel: number;
    mode: number;
    score: number;
    sceneData: Scene;
    allPlayedScenes: Scene[];
};

type SpelenActions = {
    setLevelSublevelMode: (level: number, subLevel: number, mode: number) => void;
    addOneCorrectlyAnswered: () => void;
    addOneWrongAnswered: () => void;
    getFormattedStoreData: () => FormattedData;
    setTimePlayed: (time: number) => void;
    addScene: (scene: Scene) => void;
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
    score: 0,
    timePlayed: 0,
    level: 0,
    subLevel: 0,
    mode: 0,
    sceneData: {},
    allPlayedScenes: [],
};

const initialRoundState: Partial<SpelenState> = {
    sceneData: {},
}

export const useSpelenStore = create<SpelenState & SpelenActions>((set, get) => ({
    timePlayed: 0,
    startTime: 0,
    score: 0,
    level: 0,
    subLevel: 0,
    mode: 0,
    endTime: 0,
    allPlayedScenes: [],
    sceneData: {},
    addScene: (scene: Scene) => set((state) => ({ allPlayedScenes: [...state.allPlayedScenes, scene] })),
    AddSceneData: (items: FragmentSceneData[]) => set((state) => {
        const newScene = { ...state.sceneData };
        newScene.sceneFragments = items;
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
        newScene.relistenFragments?.push(fragmentId);
        return { sceneData: newScene };
    }),
    setLevelSublevelMode: (level: number, subLevel: number, mode: number) =>
        set((state) => ({ level, subLevel, mode })),
    addOneCorrectlyAnswered: () => set((state) => {
        const newScene = { ...state.sceneData };
        if (!newScene.answeredCorrectly) {
            newScene.answeredCorrectly = 1;
            return { sceneData: newScene };
        }
        newScene.answeredCorrectly += 1;
        return { sceneData: newScene };
    }),
    addOneWrongAnswered: () => set((state) => {
        const newScene = { ...state.sceneData };
        if (!newScene.answeredWrong) {
            newScene.answeredWrong = 1;
            return { sceneData: newScene };
        }
        newScene.answeredWrong += 1;
        return { sceneData: newScene };
    }),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    setStartTime: (time: number) => set((state) => ({ startTime: time })),
    setEndTime: (time: number) => set((state) => ({ endTime: time })),
    getPercentageCorrectlyAnswered: () => {
        const { sceneData } = get();
        if(!sceneData.answeredCorrectly || !sceneData.answeredWrong) return -1;
        const total = sceneData?.answeredCorrectly + sceneData?.answeredWrong;
        if (total === 0) return 0;
        return Math.round((sceneData.answeredCorrectly / total) * 100);
    },
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
    mountStoreDevtool('SpelenStore', useSpelenStore);
}
