import { createMachine, assign } from 'xstate';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';

export interface CountdownTimings {
    one: number;
    two: number;
    three: number;
    go: number;
    soundInitialized: number;
}

export const spelenMachine = createMachine({
    predictableActionArguments: true,
    id: 'spelen',
    initial: 'idle',
    context: {
        isClickable: undefined as boolean | undefined,
        isAnimating: undefined as boolean | undefined,
        isLooping: undefined as boolean | undefined,
        allLevelFragments: undefined as FragmentWithNotes[] | undefined,
        fragmentsToShow: 0 as number,
        activeFragment: undefined as FragmentWithNotes | undefined,
        shownFragments: [] as FragmentWithNotes[],
        guessedFragment: undefined as FragmentWithNotes | undefined,
        countdownTimings: undefined as CountdownTimings | undefined,
    },
    schema: {
        services: {} as {
            playAudio: {
                data: void
            };
        },
        events: {} as
            | { type: "STARTCOUNTDOWN"; }
            | { type: "STARTCOUNTDOWN"; }
            | { type: "FINISH"; }
            | { type: "RESTART"; }
            | { type: "SOUNDFINISHED"; }
            | { type: "FINISHEDLISTENING"; }
            | { type: "FINISHEDPLAYING"; }
            | { type: "CANCELLEDPLAYING"; }
            | { type: "GUESSEDFRAGMENT"; guessedFragment: FragmentWithNotes; }
            | { type: "STARTROUND"; levelFragments: FragmentWithNotes[]; fragmentsToShow: number; countdownTimings: CountdownTimings; }
    },
    tsTypes: {} as import("./spelenMachine.typegen").Typegen0,
    states: {
        idle: {
            description: 'The state where the context data will be initialized',
            on: {
                STARTROUND: {
                    target: 'startRound',
                    actions: 'setupData',
                },
            },
        },
        startRound: {
            entry: "initializeContext",
            description: 'Starts a new round & Shows the start and back to overview button',
            on: {
                STARTCOUNTDOWN: 'countdown',
            },
        },
        countdown: {
            initial: '3',
            description: 'Has all the chid states for counting down before a scene starts',
            states: {
                "3": {
                    after: {
                        THREE: '2',
                    },
                },
                "2": {
                    after: {
                        TWO: '1',
                    },
                },
                "1": {
                    after: {
                        ONE: 'GO!',
                    },
                },
                "GO!": {
                    after: {
                        GO: '#spelen.playing',
                    },
                    exit: 'onCountdownFinished',
                },
            },
        },
        playing: {
            initial: 'initializePlaying',
            states: {
                initializePlaying: {
                    description: 'Loads the new view, at the moment the fragments need to initialize...',
                    after: {
                        SOUNDTIME: 'playSound',
                    },
                    exit: assign({ isClickable: false, isAnimating: true }),
                },
                playSound: {
                    invoke: {
                        src: async (context) => await start(context.activeFragment),
                        onDone: [{
                            target: "guessHeardFragment"
                        },]
                    },
                    description: 'In this state the active fragment is played',
                    exit: assign({ isClickable: true, isAnimating: false }),
                },
                guessHeardFragment: {
                    description: 'In this state the user can guess the heard fragment',
                    on: {
                        GUESSEDFRAGMENT: {
                            target: 'listenToFragments',
                            actions: 'setGuessedFragment',
                        },
                    },
                    exit: assign({ isClickable: undefined, isAnimating: undefined }),
                },
                listenToFragments: {
                    description: 'In this state the user can listen to all the fragments again',
                    on: {
                        FINISHEDLISTENING: '#spelen.countdown',
                    },
                },
            }
        },
        FinishedPlayingSpelenMode: {
            type: 'final',
        },
        CancelledPlayingSpelenMode: {
            type: 'final',
        },
    },
    on: {
        FINISHEDPLAYING: {
            target: 'FinishedPlayingSpelenMode',
        },
        CANCELLEDPLAYING: {
            target: 'CancelledPlayingSpelenMode',
        }
    },
},
    {
        actions: {
            setupData: assign((_, event) => {
                return {
                    allLevelFragments: event.levelFragments,
                    fragmentsToShow: event.fragmentsToShow,
                    countdownTimings: event.countdownTimings,
                };
            }),
            setGuessedFragment: assign((_, event) => {
                return {
                    guessedFragment: event.guessedFragment,
                };
            }),
            initializeContext: assign(() => {
                return {
                    isClickable: false,
                    isAnimating: false,
                    isLooping: false,
                    activeFragment: undefined,
                    guessedFragment: undefined,
                    shownFragments: [],
                }
            }),
            onCountdownFinished: assign((context) => {
                const shuffledFragments = context.allLevelFragments?.sort(() => Math.random() - 0.5);
                const newActiveFragment = shuffledFragments?.[Math.floor(Math.random() * shuffledFragments.length)];
                return {
                    shownFragments: shuffledFragments?.slice(0, context.fragmentsToShow) ?? [],
                    activeFragment: newActiveFragment,
                };
            }),
        },
        delays: {
            THREE: (context) => context.countdownTimings?.three ?? 1000,
            TWO: (context) => context.countdownTimings?.two ?? 1000,
            ONE: (context) => context.countdownTimings?.one ?? 1000,
            GO: (context) => context.countdownTimings?.go ?? 1000,
            SOUNDTIME: (context) => context.countdownTimings?.soundInitialized ?? 1000,
        },
    },
);
