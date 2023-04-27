import React, { useState } from 'react';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { SpelenMachineContext } from '~/pages/[level]/[mode]';

const FragmentPlayerRenderer: React.FC = () => {
    const [state, send] = SpelenMachineContext.useActor();
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);
    const [isPlayingFragment, setIsPlayingFragment] = useState(false);

    function checkIsAnimating(fragment: FragmentWithNotes) {
        return state.context.isAnimating === undefined
            ? activeFragmentPlayerIndex === fragment.id
            : state.context.isAnimating;
    }

    function checkIsClickable() {
        return state.context.isClickable === undefined
            ? activeFragmentPlayerIndex === undefined
            : state.context.isClickable;
    }

    function checkIsGuessedCorrect(selfFragment: FragmentWithNotes) {
        const { activeFragment, guessedFragment } = state.context;

        if(selfFragment.id === activeFragment?.id) {
            // The clicked fragment is the active fragment
            return true;
        }

        if (selfFragment.id === guessedFragment?.id) {
            // the clicked fragment is a wrong guess
            return false;
        } else {
            // the clicked fragment has not been guessed yet
            return activeFragment ? false : true;
        }
    }

    function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
        if (state.matches("playing.guessHeardFragment")) {
            if(activeFragmentPlayerIndex !== undefined) {
                setactiveFragmentPlayerIndex(undefined);
            }
            send({ type: "GUESSEDFRAGMENT", guessedFragment: fragment })
            return;
        }

        if (state.matches("playing.listenToFragments")) {
            setIsPlayingFragment(true);
            setactiveFragmentPlayerIndex(fragment.id);
            if (activeFragmentPlayerIndex === undefined) {
                start(fragment);
            }
        }
    }

    function onFragmentPlayingComplete() {
        setIsPlayingFragment(false);
        setactiveFragmentPlayerIndex(undefined);
    }

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
                            onAnimationComplete: onFragmentPlayingComplete
                        } } />
                ))
            }
            <button
                disabled={ !state.matches("playing.listenToFragments") || isPlayingFragment }
                onClick={ () => send("FINISHEDLISTENING") }
                className={
                    `rounded-xl bg-white/10 p-4 text-white hover:bg-white/20
                          ${state.matches("playing.listenToFragments") && !isPlayingFragment ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
            >
                <h3 className="text-center text-xl font-bold">Volgende</h3>
            </button>
        </>
    )
};

export default FragmentPlayerRenderer;
