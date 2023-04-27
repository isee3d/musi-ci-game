import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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

const Spelen: React.FC<SpelenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);

    const [state, send] = useMachine(spelenMachine, {
        actions: {
            onPlayingEntry: playAudio,
        },
        devTools: true,
    })

    useEffect(() => {
        send({ type: "STARTROUND", levelFragments: fragments, fragmentsToShow: fragmentsToShow })
    }, [])

    async function playAudio() {
        await start(state.context.activeFragment, { onFinishedPlaying: () => send("SOUNDFINISHED") })
    }

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

    function checkIsGuessedCorrect(selfFragment: FragmentWithNotes) {
        if (selfFragment.id === state.context.activeFragment?.id) {
            // the clicked fragment is the active fragment
            return true;
        } else {
            // the clicked fragment is not the active fragment
            if (selfFragment.id === state.context.guessedFragment?.id) {
                // the clicked fragment is a wrong guess
                return false;
            } else {
                // the clicked fragment has not been guessed yet
                return state.context.activeFragment ? false : true;
            }
        }
    }

    function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
        if (state.matches("playing.guessHeardFragment")) {
            setactiveFragmentPlayerIndex(undefined);
            send({ type: "GUESSEDFRAGMENT", guessedFragment: fragment })
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
                    onClick={ () => send("FINISHEDPLAYING") }
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
                { state.toStrings()[1]?.split('.')[1] }
            </div>
        );
    }

    function renderFragmentPlayers() {
        return (
            <>
                {
                    state.context.shownFragments.map((fragment) => (
                        <AnimationPlayer
                            key={ fragment.id }
                            animationFragment={ fragment }
                            options={ {
                                isClickable: checkIsClickable(),
                                isAnimating: checkIsAnimating(fragment),
                                showCorrectOutline: state.matches("playing.listenToFragments"),
                                isCorrect: checkIsGuessedCorrect(fragment),
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
            { state.matches('startRound') && startSceneScreen() }
            { state.matches('countdown') && countdownSceneScreen() }
            { state.matches('playing') && renderFragmentPlayers() }
        </>
    );
};

export default Spelen;
