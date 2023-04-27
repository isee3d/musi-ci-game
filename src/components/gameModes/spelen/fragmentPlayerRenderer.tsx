import React, { useState } from 'react';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { SpelenMachineContext } from '~/pages/[level]/[mode]';
import { shallowEqual } from '@xstate/react';

const FragmentPlayerRenderer: React.FC = () => {
    const { send } = SpelenMachineContext.useActorRef();
    const isAnimating = SpelenMachineContext.useSelector(state => state.context.isAnimating);
    const isClickable = SpelenMachineContext.useSelector(state => state.context.isClickable);
    const activeFragment = SpelenMachineContext.useSelector(state => state.context.activeFragment, shallowEqual);
    const guessedFragment = SpelenMachineContext.useSelector(state => state.context.guessedFragment, shallowEqual);
    const shownFragments = SpelenMachineContext.useSelector(state => state.context.shownFragments, shallowEqual);
    const guessHeardFragmentState = SpelenMachineContext.useSelector(state => state.matches("playing.guessHeardFragment"));
    const listenToFragmentsState = SpelenMachineContext.useSelector(state => state.matches("playing.listenToFragments"));

    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);
    const [isPlayingFragment, setIsPlayingFragment] = useState(false);

    function checkIsAnimating(fragment: FragmentWithNotes) {
        return isAnimating === undefined
            ? activeFragmentPlayerIndex === fragment.id
            : isAnimating;
    }

    function checkIsClickable() {
        return isClickable === undefined
            ? activeFragmentPlayerIndex === undefined
            : isClickable;
    }

    function checkIsGuessedCorrect(selfFragment: FragmentWithNotes) {
        if (selfFragment.id === activeFragment?.id) {
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
        if (guessHeardFragmentState) {
            if (activeFragmentPlayerIndex !== undefined) {
                setactiveFragmentPlayerIndex(undefined);
            }
            send({ type: "GUESSEDFRAGMENT", guessedFragment: fragment })
            return;
        }

        if (listenToFragmentsState) {
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
                shownFragments.map((fragment) => (
                    <AnimationPlayer
                        key={ fragment.id }
                        animationFragment={ fragment }
                        options={ {
                            isClickable: checkIsClickable(),
                            isAnimating: checkIsAnimating(fragment),
                            showCorrectOutline: listenToFragmentsState,
                            isCorrect: checkIsGuessedCorrect(fragment),
                            // isLooping: true,
                            onAnimationClicked: onFragmentPlayerClicked,
                            onAnimationComplete: onFragmentPlayingComplete
                        } } />
                ))
            }
            <button
                disabled={ !listenToFragmentsState || isPlayingFragment }
                onClick={ () => send("FINISHEDLISTENING") }
                className={
                    `rounded-xl bg-white/10 p-4 text-white hover:bg-white/20
                          ${listenToFragmentsState && !isPlayingFragment ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
            >
                <h3 className="text-center text-xl font-bold">Volgende</h3>
            </button>
        </>
    )
};

export default FragmentPlayerRenderer;
