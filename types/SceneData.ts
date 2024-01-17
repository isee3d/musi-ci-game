export interface FragmentSceneData {
    id_fragment: number;
    fragmentIndex: number;
    groundTone: string;
    octave: number;
}

export interface Scene {
    sceneFragments?: FragmentSceneData[];
    relistenFragments?: number[];
    chosenFragment?: number | undefined;
    chosenFragmentlatency?: number | undefined;
    answeredCorrectly?: boolean;
    id_playedFragment?: number;
    startTime?: Date;
}

interface FormattedScene {
    sceneFragments: FragmentSceneData[];
    relistenFragments: {
        id_fragment: number;
        relistenCount: number;
    }[]
    chosenFragmentlatency?: number | undefined;
    id_chosenFragment?: number | undefined;
    answeredCorrectly?: boolean;
    id_playedFragment?: number;
}

export interface FormattedData {
    id_User: string;
    id_level: number;
    id_subLevel: number;
    id_gameMode: number;
    startTime: Date;
    endTime: Date;
    score: number;
    Scenes: FormattedScene[];
}

export type WeightedInterval = {
  interval: number
  weight: number
}
