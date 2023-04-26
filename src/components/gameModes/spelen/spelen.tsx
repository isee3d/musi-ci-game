import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useMachine } from "@xstate/react";
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import AudioPlayer from '~/components/fragmentPlayer/audioPlayer';
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine';
import { StateValue, StateValueMap } from 'xstate';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';

interface SpelenProps {
    fragments: FragmentWithNotes[];
    levelName: string;
    fragmentsToShow: number;
}

enum SpelenState {
    IDLE,
    COUNTDOWN,
    PLAYING,
    STOPPED
}

const Spelen: React.FC<SpelenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const [activeFragment, setActiveFragment] = useState<FragmentWithNotes | undefined>(fragments[0]);
    const [shownFragments, setShownFragments] = useState(fragments.slice(0, fragmentsToShow));

    const [state, send] = useMachine(spelenMachine, {
        actions: {
            onPlayingEntry: async () => await start(activeFragment, { onFinishedPlaying: setSoundFinished }),
        },
    })

    function setSoundFinished() {
        send("SOUNDFINISHED")
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
                                isClickable: state.context.isClickable,
                                isAnimating: state.context.isAnimating ?? false,
                                // isLooping: true,
                                // onAnimationClicked: isCorrectFragment,
                                // onAnimationComplete: onAnimationFinishedPlaying
                            } } />
                    ))
                }
                <button
                    disabled={ false }
                    onClick={ () => send("FINISH") }
                    className={
                        `rounded-xl bg-white/10 p-4 text-white hover:bg-white/20
                          ${false ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
                >
                    <h3 className="text-center text-xl font-bold">Volgende</h3>
                </button>
            </>
        )
    }

    // function isCorrectFragment(fragmentID: number) {
    //     if (activeFragment?.id === fragmentID) {
    //         return true;
    //     }
    //     return false;
    // }

    // function onAnimationFinishedPlaying() {
    //     console.log('finished playing');
    // }

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { state.matches('idle') && startSceneScreen() }
            { state.matches('countdown') && countdownSceneScreen() }
            { state.matches('playing') && renderFragmentPlayers()  }
        </>
    );
};

export default Spelen;
