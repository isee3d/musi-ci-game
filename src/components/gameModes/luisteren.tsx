import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';

interface LuisterenProps {
    fragmentsToShow: number;
    fragments: FragmentWithNotes[];
    levelName: string;
}

function formatTime(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours}h ${minutes}m ${seconds}s`;
}


const Luisteren: React.FC<LuisterenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const [shownFragments, setShownFragments] = useState(fragments.slice(0, fragmentsToShow));
    const [isPlayingGameMode, setIsPlayingGameMode] = useState(true);
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);
    const time = useRef(Date.now());

    function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
        setactiveFragmentPlayerIndex(fragment.id);
        if (activeFragmentPlayerIndex === undefined) {
            start(fragment);
        }
    }

    function renderFragmentPlayers() {
        return shownFragments.map((fragment) => (
            <AnimationPlayer
                key={ fragment.id }
                animationFragment={ fragment }
                options={ {
                    isAnimating: activeFragmentPlayerIndex === fragment.id,
                    isClickable: activeFragmentPlayerIndex === undefined,
                    onAnimationClicked: onFragmentPlayerClicked,
                    onAnimationComplete: () => setactiveFragmentPlayerIndex(undefined)
                } }
            />
        ));
    }

    function shuffleNewFragments() {
        const shuffledFragments = fragments.sort(() => Math.random() - 0.5);
        const selectedFragments = shuffledFragments.slice(0, fragmentsToShow);
        setShownFragments(selectedFragments);
    }

    function renderPlayingButtons() {
        return (
            <>
                <button
                    onClick={ shuffleNewFragments }
                    className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                >
                    <h3 className="text-center text-xl font-bold">Play knop</h3>
                </button>
                <button
                    onClick={ () => setIsPlayingGameMode(false) }
                    className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                >
                    <h3 className="text-center text-xl font-bold">Stop Luisteren</h3>
                </button>
            </>
        )
    }

    function renderBacktoOverviewLink() {
        return (
            <Link
                href={ `/modeSelect/${levelName}` }
                className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
            >
                <h3 className="text-center text-xl font-bold">Terug naar overzicht</h3>
            </Link>
        );
    }

    function showStopped() {
        const timePlayed = Date.now() - time.current;
        return (
            <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
                You played for { formatTime(timePlayed) }
            </h3>
        )
    }

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { isPlayingGameMode && renderFragmentPlayers() }
            { !isPlayingGameMode && showStopped() }
            <div className=" flex justify-center space-x-5">
                { !isPlayingGameMode && renderBacktoOverviewLink() }
                { isPlayingGameMode && renderPlayingButtons() }
            </div>
        </>
    );
};

export default Luisteren;
