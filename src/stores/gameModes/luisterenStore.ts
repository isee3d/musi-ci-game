import { create } from "zustand";

type LuisterenState = {
    timePlayed: number;
    score: number;
};

type LuisterenActions = {
    addScore: (score: number) => void;
    setTimePlayed: (time: number) => void;
    reset: () => void;
};

const initialState: LuisterenState = {
    timePlayed: 0,
    score: 0,
};

export const useLuisterenStore = create<LuisterenState & LuisterenActions>((set, get) => ({
    timePlayed: 0,
    score: 0,
    addScore: (score: number) => set((state) => ({ score: state.score + score })),
    setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
    reset: () => set(initialState),
}));
