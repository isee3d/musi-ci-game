import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { start } from 'repl';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import AudioPlayer from '~/components/fragmentPlayer/audioPlayer';

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
    const [spelenState, setSpelenState] = useState(SpelenState.IDLE);
    const [shownFragments, setShownFragments] = useState(fragments.slice(0, fragmentsToShow));
    const [countdownValue, setCountdownValue] = useState<string | number>(3);

    const [activeFragment, setActiveFragment] = useState<FragmentWithNotes | undefined>(undefined);


    useEffect(() => {
        if (spelenState === SpelenState.COUNTDOWN) {
            if (countdownValue as number > 1) {
                const countdownTimeout = setTimeout(() => {
                    setCountdownValue(countdownValue as number - 1);
                }, 1000);
                return () => clearTimeout(countdownTimeout);
            } else if (countdownValue === 1) {
                const goTimeout = setTimeout(() => {
                    setCountdownValue('GO!');
                }, 1000);
                return () => clearTimeout(goTimeout);
            } else {
                const xTimeout = setTimeout(() => {
                    setActiveFragment(shownFragments[0]!);

                }, 5000);
                const playingTimeout = setTimeout(() => {
                    setSpelenState(SpelenState.PLAYING);
                    setCountdownValue(3);
                }, 1000);
                return () => clearTimeout(playingTimeout);
            }
        }
    }, [spelenState, countdownValue]);

    function startSceneScreen() {
        return (
            <div className='flex justify-center space-x-5'>
                <button
                    onClick={ () => setSpelenState(SpelenState.COUNTDOWN) }
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
                { countdownValue }
            </div>
        )
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
                                isClickable: true,
                                isAnimating: true,
                                // isLooping: true,
                                // onAnimationClicked: isCorrectFragment,
                                onAnimationComplete: onAnimationFinishedPlaying
                            } } />
                    ))
                }
                <button
                    disabled={ false }
                    onClick={ () => setSpelenState(SpelenState.IDLE) }
                    className={
                        `rounded-xl bg-white/10 p-4 text-white hover:bg-white/20
                          ${false ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
                >
                    <h3 className="text-center text-xl font-bold">Volgende</h3>
                </button>
            </>
        )
    }

    function isCorrectFragment(fragmentID: number) {
        if (activeFragment?.id === fragmentID) {
            return true;
        }
        return false;
    }

    function onAnimationFinishedPlaying() {
        console.log('finished playing');
    }

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { spelenState === SpelenState.IDLE && startSceneScreen() }
            { spelenState === SpelenState.COUNTDOWN && countdownSceneScreen() }
            { spelenState === SpelenState.PLAYING && renderFragmentPlayers() }
        </>
    );
};

export default Spelen;
