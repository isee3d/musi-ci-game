import { Latency } from 'types/latency';
import { createMachine, assign } from 'xstate';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { FragmentWithNotes, FragmentWithNotesAndTransposeDirection } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { CountdownTimings } from '~/components/gameModes/spelen/spelenMachine';
// import { CountdownActions } from '~/hooks/useCountdown';
import { StopwatchActions } from '~/hooks/useStopwatch';
import { useAudioServiceStore } from '~/stores/useAudioServiceStore';

const Transpose = (fragments: FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
    fragmentsToShow: number) => {
    const { transposeFragments } = useAudioServiceStore.getState();
    const shuffledFragments = fragments.sort(() => Math.random() - 0.5);
    const selectedFragments = shuffledFragments.slice(0, fragmentsToShow);
    const randomTransposeDirection = Math.floor(Math.random() * 12 - 0.0001) - 6;
    const transposedFragments = transposeFragments(selectedFragments, randomTransposeDirection);
    const TransPosedfragmentsWithdirection = transposedFragments.map((fragment) => {
        return { ...fragment, transpose: randomTransposeDirection };
    });

    return TransPosedfragmentsWithdirection as FragmentWithNotesAndTransposeDirection[];
};


export const uitdagingMachine = createMachine({
    predictableActionArguments: true,
    id: 'spelen',
    initial: 'idle',
    context: {
        isClickable: undefined as boolean | undefined,
        isAnimating: undefined as boolean | undefined,
        isLooping: undefined as boolean | undefined,
        allLevelFragments: [] as FragmentWithNotesAndTransposeDirection[] | FragmentWithNotes[],
        fragmentsToShow: 0 as number,
        activeFragment: undefined as FragmentWithNotes | undefined,
        shownFragments: [] as FragmentWithNotesAndTransposeDirection[],
        guessedFragment: undefined as FragmentWithNotes | undefined,
        countdownTimings: undefined as CountdownTimings | undefined,
        countdownActions: undefined as StopwatchActions | undefined,
        latency: undefined as Latency | undefined,
        amountPlayed: 0 as number,
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
            | { type: "FINISHEDPLAYING"; }
            | { type: "GUESSEDFRAGMENT"; guessedFragment: FragmentWithNotes; }
            | { type: "STARTROUND"; levelFragments: FragmentWithNotes[]; fragmentsToShow: number; countdownTimings: CountdownTimings; countdownActions: StopwatchActions; }
    },
    tsTypes: {} as import("./uitdagingMachine.typegen").Typegen0,
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
            // exit: (context) => context.countdownActions?.start(),
            // exit: "initTimer"
        },
        countdown: {
            entry: (context) => context.countdownActions?.start(),
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
                },
            },
        },
        playing: {
            entry: 'onCountdownStarted',
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
                    entry: (context) => context.countdownActions?.resume(),
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
                    entry: assign({
                        latency: () => ({ startTime: Date.now(), endTime: 0, latency: 0 })
                    }),
                    description: 'In this state the user can guess the heard fragment',
                    on: {
                        GUESSEDFRAGMENT: {
                            target: 'restAfterAnswering',
                            actions: 'setGuessedFragment',
                        },
                    },
                    exit: [
                        assign({
                            latency: (context) => {
                                if (context.latency) {
                                    const endTime = Date.now();
                                    const latency = endTime - context.latency.startTime;
                                    return { ...context.latency, endTime, latency };
                                }
                                return context.latency;
                            },
                            isClickable: undefined,
                            isAnimating: undefined
                        }),
                    ]
                },
                restAfterAnswering: {
                    entry: (context) => context.countdownActions?.pause(),
                    description: 'In this state the users gets a 1 second rest and the timer has to stop',
                    after: {
                        1000: '#spelen.playing',
                    },
                    exit: [
                        assign({
                            amountPlayed: (context) => context.amountPlayed + 1,
                        }),
                        (context) => context.countdownActions?.resume(),
                    ]
                },
            }
        },
        FinishedPlayingUitdagingMode: {
            entry: (context) => context.countdownActions?.reset(),
            type: 'final',
        },
    },
    on: {
        FINISHEDPLAYING: 'FinishedPlayingUitdagingMode',
    }
},
    {
        actions: {
            setupData: assign((_, event) => {
                return {
                    allLevelFragments: event.levelFragments,
                    fragmentsToShow: event.fragmentsToShow,
                    countdownTimings: event.countdownTimings,
                    countdownActions: event.countdownActions,
                };
            }),
            // initTimer: (context) => {
            //     context.countdownActions?.start();
            // },
            setGuessedFragment: assign((context, event) => {
                context.countdownActions?.pause();
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
            onCountdownStarted: assign((context) => {
                const shuffledFragments = context.allLevelFragments?.sort(() => Math.random() - 0.5);
                let newActiveFragment: FragmentWithNotes | undefined = undefined;
                let transposedFragments: FragmentWithNotesAndTransposeDirection[] | undefined = undefined;
                if (shuffledFragments) {
                    transposedFragments = Transpose(shuffledFragments, context.fragmentsToShow);
                    newActiveFragment = transposedFragments?.[Math.floor(Math.random() *
                        shuffledFragments.length)]
                }
                return {
                    guessedFragment: undefined,
                    shownFragments: transposedFragments?.slice(0, context.fragmentsToShow) ?? [],
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
    });
