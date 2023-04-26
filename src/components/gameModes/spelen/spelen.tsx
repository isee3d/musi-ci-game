import Link from 'next/link';
import React, { useState } from 'react';
import { useMachine } from "@xstate/react";
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';

interface SpelenProps {
    fragments: FragmentWithNotes[];
    levelName: string;
    fragmentsToShow: number;
}

// TODO: Add green/red render when in the choosing state
// TODO: shuffle the shown fragments and set a new fragment to play

const Spelen: React.FC<SpelenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const [activeFragment, setActiveFragment] = useState<FragmentWithNotes | undefined>(fragments[0]);
    const [shownFragments, setShownFragments] = useState(fragments.slice(0, fragmentsToShow));
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);

    const [state, send] = useMachine(spelenMachine, {
        actions: {
            onPlayingEntry: async () => await start(activeFragment, { onFinishedPlaying: () => send("SOUNDFINISHED") }),
        },
        devTools: true,
    })

    function checkIsAnimating(fragment: FragmentWithNotes) {
        if (state.context.isAnimating === undefined) {
            return activeFragmentPlayerIndex === fragment.id;
        }
        return state.context.isAnimating;
    }

    function checkIsClickable() {
        if (state.context.isClickable === undefined) {
            return activeFragmentPlayerIndex === undefined;
        }
        return state.context.isClickable;
    }

    function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
        if (state.matches("playing.guessHeardFragment")) {
            setactiveFragmentPlayerIndex(undefined);
            console.log("isCorrect: " + (fragment.id === activeFragment?.id))
            // Render green/red outline for every fragmentplayer
            send("GUESSEDFRAGMENT")
            return;
        }
        if (state.matches("playing.listenToFragments")) {
            setactiveFragmentPlayerIndex(fragment.id);
            if (activeFragmentPlayerIndex === undefined) {
                start(fragment);
            }
        }
    }

    function startSceneScreen() {
        return (
            <div className='flex justify-center space-x-5'>
                <button
                    onClick={ () => send("STARTCOUNTDOWN") }
                    className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                >
                    <h3 className="text-center text-xl font-bold">Start</h3>
                </button>
                <Link
                    href={ `/modeSelect/${levelName}` }
                    className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                >
                    <h3 className="text-center text-xl font-bold">Terug naar overzicht</h3>
                </Link>
            </div>
        )
    }

    function countdownSceneScreen() {
        return (
            <div className="text-center text-4xl font-extrabold tracking-tight text-white">
                { state.toStrings()[1]?.split('.')[1] + '!' }
            </div>
        );
    }

    function renderFragmentPlayers() {
        return (
            <>
                {
                    shownFragments.map((fragment) => (
                        <AnimationPlayer
                            key={ fragment.id }
                            animationFragment={ fragment }
                            options={ {
                                isClickable: checkIsClickable(),
                                isAnimating: checkIsAnimating(fragment),
                                // isLooping: true,
                                onAnimationClicked: onFragmentPlayerClicked,
                                onAnimationComplete: () => setactiveFragmentPlayerIndex(undefined)
                            } } />
                    ))
                }
                <button
                    disabled={ !state.matches("playing.listenToFragments") }
                    onClick={ () => send("FINISHEDLISTENING") }
                    className={
                        `rounded-xl bg-white/10 p-4 text-white hover:bg-white/20
                          ${state.matches("playing.listenToFragments") ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
                >
                    <h3 className="text-center text-xl font-bold">Volgende</h3>
                </button>
            </>
        )
    }

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { state.matches('idle') && startSceneScreen() }
            { state.matches('countdown') && countdownSceneScreen() }
            { state.matches('playing') && renderFragmentPlayers() }
        </>
    );
};

export default Spelen;
