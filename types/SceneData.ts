export interface FragmentSceneData {
    fragmentId: number;
    fragmentIndex: number;
    isCorrectFragment?: boolean;
    isPlayedFragment?: boolean;
    groundTone: number;
}

export interface Scene {
    fragments?: FragmentSceneData[];
    chosenFragment?: number | undefined;
    chosenFragmentlatency?: number | undefined;
}

export interface ModeData {
    level: string;
    subLevel: string;
    mode: string;
}

