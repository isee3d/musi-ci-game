import { create } from "zustand";

type SpelenState = {
    timePlayed: number;
    answeredCorrectly: number;
    answeredWrong: number;
};

type SpelenActions = {
    addOneCorrectlyAnswered: () => void;
    addOneWrongAnswered: () => void;
    setTimePlayed: (time: number) => void;
    getPercentageCorrectlyAnswered: () => number;
    reset: () => void;
};

const initialState: SpelenState = {
    timePlayed: 0,
    answeredCorrectly: 0,
    answeredWrong: 0,
};

export const useSpelenStore = create<SpelenState & SpelenActions>((set, get) => ({
    timePlayed: 0,
    answeredCorrectly: 0,
    answeredWrong: 0,
    addOneCorrectlyAnswered: () => set((state) => ({ answeredCorrectly: state.answeredCorrectly + 1 })),
    addOneWrongAnswered: () => set((state) => ({ answeredWrong: state.answeredWrong + 1 })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    getPercentageCorrectlyAnswered: () => {
        const { answeredCorrectly, answeredWrong } = get();
        const total = answeredCorrectly + answeredWrong;
        if (total === 0) return 0;
        return Math.round((answeredCorrectly / total) * 100);
    },
    reset: () => set(initialState),
}));
