import { createMachine, assign } from "xstate";
import { FragmentWithNotes } from "~/components/fragmentPlayer/audio/fragmentWithNotes";
import { useAudioServiceStore } from "~/stores/useAudioServiceStore";

const shuffleAndTranspose = (fragments: FragmentWithNotes[], fragmentsToShow: number) => {
    const { transposeFragments } = useAudioServiceStore.getState();
    const shuffledFragments = fragments.sort(() => Math.random() - 0.5);
    const selectedFragments = shuffledFragments.slice(0, fragmentsToShow);
    const randomTransposeDirection = Math.floor(Math.random() * 12 - 0.0001) - 6;
    const transposedFragments = transposeFragments(selectedFragments, randomTransposeDirection);

    return transposedFragments;
};

export const luisterenMachine = createMachine({
    predictableActionArguments: true,
    id: 'luisteren',
    initial: 'idle',
    context: {
        allLevelFragments: [] as FragmentWithNotes[],
        fragmentsToShow: 0 as number,
        shownFragments: [] as FragmentWithNotes[],

    },
    schema: {
        events: {} as
            | { type: "STARTROUND"; levelFragments: FragmentWithNotes[]; fragmentsToShow: number; }
            | { type: "STARTPLAYING"; }
            | { type: "FINISHEDLISTENING"; }
            | { type: "SHUFFLEFRAGMENTS"; }
    },
    tsTypes: {} as import("./LuisterenMachine.typegen").Typegen0,
    states: {
        idle: {
            description: 'The state where the context data will be initialized',
            on: {
                STARTROUND: { target: "playing", actions: "setupData" }
            },
        },
        playing: {
            entry: "initializeShownFragments",
            description: "The state where the user is listening to the fragments",
            on: {
                FINISHEDLISTENING: "finishedListening",
            },
        },
        finishedListening: {
            description: "The state where the user is done playing",
            type: "final",
        },
    },
    on: {
        SHUFFLEFRAGMENTS: {
            actions: "shuffleFragments",
        }
    }
},
    {
        actions: {
            setupData: assign((_, event) => {
                return {
                    allLevelFragments: event.levelFragments,
                    fragmentsToShow: event.fragmentsToShow,
                }
            }),
            initializeShownFragments: assign((context) => {
                const transposedFragments = shuffleAndTranspose(context.allLevelFragments, context.fragmentsToShow);
                return {
                    shownFragments: transposedFragments,
                }
            }),
            shuffleFragments: assign((context) => {
                const transposedFragments = shuffleAndTranspose(context.allLevelFragments, context.fragmentsToShow);
                return {
                    shownFragments: transposedFragments,
                }
            })
        }
    }
)
