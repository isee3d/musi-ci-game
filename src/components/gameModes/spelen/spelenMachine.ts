import { createMachine, assign } from 'xstate';

export const spelenMachine = createMachine({
    id: 'spelen',
    initial: 'idle',
    context: {
        isClickable: undefined as boolean | undefined,
        isAnimating: true as boolean | undefined,
        isLooping: undefined as boolean | undefined,
    },
    schema: {
        events: {} as
            | { type: "STARTCOUNTDOWN"; }
            | { type: "STARTCOUNTDOWN"; }
            | { type: "FINISH"; }
            | { type: "RESTART"; }
            | { type: "SOUNDFINISHED"; }
            | { type: "GUESSEDFRAGMENT"; }
            | { type: "FINISHEDLISTENING"; }
    },
    tsTypes: {} as import("./spelenMachine.typegen").Typegen0,
    states: {
        idle: {
            on: {
                STARTCOUNTDOWN: 'countdown',
            },
        },
        countdown: {
            initial: '3',
            states: {
                3: {
                    after: {
                        1000: '2',
                    },
                },
                2: {
                    after: {
                        1000: '1',
                    },
                },
                1: {
                    after: {
                        1000: 'GO',
                    },
                },
                GO: {
                    after: {
                        1000: '#spelen.playing',
                    },
                },
            },
        },
        playing: {
            initial: 'initializePlaying',
            states: {
                initializePlaying: {
                    // entry: assign({ isClickable: undefined, isAnimating: true }),
                    after: {
                        3000: 'playSound',
                    }
                },
                playSound: {
                    entry: 'onPlayingEntry',
                    on: {
                        SOUNDFINISHED: 'guessHeardFragment',
                    }
                },
                guessHeardFragment: {
                    entry: assign({isClickable: true, isAnimating: undefined}),
                    on: {
                        GUESSEDFRAGMENT: 'listenToFragments',
                    },
                },
                listenToFragments: {
                    on: {
                        FINISHEDLISTENING: '#spelen.idle'
                    },
                },
            }
        },
    }
});
