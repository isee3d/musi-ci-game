import React, { useEffect, useState } from 'react';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
// import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { UitdagingMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { shallowEqual } from '@xstate/react';
import { useUitdagingStore } from '~/stores/gameModes/uitdagingStore';
import { FragmentSceneData } from 'types/SceneData';

const UitdagingFragmentPlayerRenderer: React.FC = () => {
    const { send } = UitdagingMachineContext.useActorRef();
    const isAnimating = UitdagingMachineContext.useSelector(state => state.context.isAnimating);
    const isClickable = UitdagingMachineContext.useSelector(state => state.context.isClickable);
    const activeFragment = UitdagingMachineContext.useSelector(state => state.context.activeFragment, shallowEqual);
    const guessedFragment = UitdagingMachineContext.useSelector(state => state.context.guessedFragment, shallowEqual);
    const shownFragments = UitdagingMachineContext.useSelector(state => state.context.shownFragments, shallowEqual);
    const guessHeardFragmentState = UitdagingMachineContext.useSelector(state => state.matches("playing.guessHeardFragment"));
    const listenToFragmentsState = UitdagingMachineContext.useSelector(state => state.matches("playing.restAfterAnswering"));
    const latency = UitdagingMachineContext.useSelector(state => state.context.latency?.latency);
    const amountPlayed = UitdagingMachineContext.useSelector(state => state.context.amountPlayed);

    const {
        addOneCorrectlyAnswered,
        addOneWrongAnswered,
        AddSceneData,
        setEndTime,
        setChosenFragment,
        setChosenFragmentLatency,
    } = useUitdagingStore();

    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        const sceneData: FragmentSceneData[] = [];
        shownFragments.forEach((fragment, index) => {
            sceneData.push({
                id_fragment: fragment.id,
                fragmentIndex: index,
                groundTone: fragment.transpose,
            })
        })
        AddSceneData(sceneData);
        if (amountPlayed === 2) {
            setEndTime(Date.now());
            send("FINISHEDPLAYING");
        }
    }, [shownFragments])

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

    function checkIsGuessedCorrect(selfFragment: FragmentWithNotes): boolean {
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
            send({ type: "GUESSEDFRAGMENT", guessedFragment: fragment })
            if (activeFragmentPlayerIndex !== undefined) {
                setactiveFragmentPlayerIndex(undefined);
            }
            checkIsGuessedCorrect(fragment) ? addOneCorrectlyAnswered() : addOneWrongAnswered();
            setChosenFragment(fragment.id);
            return;
        }
    }

    function onFragmentPlayingComplete() {
        setactiveFragmentPlayerIndex(undefined);
        setChosenFragmentLatency(latency ?? -1);
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
                            showCorrectOutline: false,
                            isCorrect: checkIsGuessedCorrect(fragment),
                            // isLooping: true,
                            onAnimationClicked: onFragmentPlayerClicked,
                            onAnimationComplete: onFragmentPlayingComplete
                        } } />
                ))
            }
            {/* <button
                disabled={ !listenToFragmentsState || isPlayingFragment }
                onClick={ () => send("FINISHEDLISTENING") }
                className={
                    `rounded-xl bg-white/10 p-4 text-white hover:bg-white/20
                          ${listenToFragmentsState && !isPlayingFragment ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
            >
                <h3 className="text-center text-xl font-bold">Volgende</h3>
            </button> */}
        </>
    )
};

export default UitdagingFragmentPlayerRenderer;
