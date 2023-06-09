import React, { useEffect, useState } from 'react';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { SpelenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { shallowEqual } from '@xstate/react';
import { FragmentSceneData } from 'types/SceneData';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';

const FragmentPlayerRenderer: React.FC = () => {
    const { send } = SpelenMachineContext.useActorRef();
    const isAnimating = SpelenMachineContext.useSelector(state => state.context.isAnimating);
    const isClickable = SpelenMachineContext.useSelector(state => state.context.isClickable);
    const activeFragment = SpelenMachineContext.useSelector(state => state.context.activeFragment, shallowEqual);
    const guessedFragment = SpelenMachineContext.useSelector(state => state.context.guessedFragment, shallowEqual);
    const shownFragments = SpelenMachineContext.useSelector(state => state.context.shownFragments, shallowEqual);
    const latency = SpelenMachineContext.useSelector(state => state.context.latency?.latency);
    const guessHeardFragmentState = SpelenMachineContext.useSelector(state => state.matches("playing.guessHeardFragment"));
    const listenToFragmentsState = SpelenMachineContext.useSelector(state => state.matches("playing.listenToFragments"));

    const {
        addNewUserSceneAnswer,
        AddSceneData,
        setEndTime,
        addRelistenFragment,
        setChosenFragment,
        addScene,
        sceneData,
        getFormattedStoreData,
    } = useLuisterenStore();

    const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation({
        onSuccess: () => {
            toast.success("levelResult created!");
        },
        onError: () => {
            toast.error("Failed to upload new levelresult!");
        }
    });

    // local state
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);
    const [isPlayingFragment, setIsPlayingFragment] = useState(false);

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
            if (activeFragmentPlayerIndex !== undefined) {
                setactiveFragmentPlayerIndex(undefined);
            }
            addNewUserSceneAnswer(checkIsGuessedCorrect(fragment));
            setChosenFragment(fragment.id);
            send({ type: "GUESSEDFRAGMENT", guessedFragment: fragment })
            return;
        }
        // setChosenFragmentLatency(latency ?? -1);
        if (listenToFragmentsState) {
            setIsPlayingFragment(true);
            setactiveFragmentPlayerIndex(fragment.id);
            if (activeFragmentPlayerIndex === undefined) {
                start(fragment);
            }
            addRelistenFragment(fragment.id);
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
                            guessedFragment: guessedFragment,
                            // isLooping: true,
                            onAnimationClicked: onFragmentPlayerClicked,
                            onAnimationComplete: onFragmentPlayingComplete
                        } } />
                ))
            }
            <div className='flex justify-center space-x-12'>
                <button
                    disabled={ !listenToFragmentsState || isPlayingFragment }
                    onClick={ () => {
                        addScene(sceneData);
                        send("FINISHEDLISTENING")
                    } }
                    className={
                        `rounded-xl bg-white/10 p-4 text-white hover:bg-white/20
                          ${listenToFragmentsState && !isPlayingFragment ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
                >
                    <h3 className="text-center text-xl font-bold">Volgende</h3>
                </button>
                <button
                    onClick={ () => {
                        setEndTime(Date.now());
                        send("FINISHEDPLAYING")
                        console.log("my data: " + JSON.stringify(getFormattedStoreData()));
                        saveToDB(getFormattedStoreData());
                    } }
                    className={
                        `rounded-xl bg-white/10 p-4 text-center text-xl font-bold text-white hover:bg-white/20` }
                >
                    stoppen
                </button>
            </div>
        </>
    )
};

export default FragmentPlayerRenderer;
