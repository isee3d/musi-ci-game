export interface FragmentSceneData {
    id_fragment: number;
    fragmentIndex: number;
    isCorrectFragment?: boolean;
    isPlayedFragment?: boolean;
    groundTone: number;
}

export interface Scene {
    sceneFragments?: FragmentSceneData[];
    relistenFragments?: number[];
    chosenFragment?: number | undefined;
    chosenFragmentlatency?: number | undefined;
}

interface FormattedScene {
    sceneFragments: FragmentSceneData[];
    relistenFragments: {
        id_fragment: number;
        relistenCount: number | undefined;
    }[]
    // id_chosenFragment?: number | undefined;
    chosenFragmentlatency?: number | undefined;
}

export interface FormattedData {
    id_User: string;
    id_level: number;
    id_subLevel: number;
    id_gameMode: number;
    answeredCorrectlyAmount?: number;
    answeredIncorrectlyAmount?: number;
    startTime: Date;
    endTime: Date;
    score: number;
    Scenes: FormattedScene[];
}

export interface ModeData {
    level: string;
    subLevel: string;
    mode: string;
}

