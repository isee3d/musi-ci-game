import React, { useState } from 'react';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { SpelenMachineContext } from '~/pages/[level]/[mode]';

const FragmentPlayerRenderer: React.FC = () => {
    const [state, send] = SpelenMachineContext.useActor();
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);

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
            if(activeFragmentPlayerIndex !== undefined) {
                setactiveFragmentPlayerIndex(undefined);
            }
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
};

export default FragmentPlayerRenderer;
