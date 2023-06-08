import React, { useEffect, useState } from 'react';
import { FragmentSceneData } from 'types/SceneData';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { LuisterenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';

const LuisterenfragmentPlayerRenderer: React.FC = () => {
    const shownFragments = LuisterenMachineContext.useSelector(state => state.context.shownFragments);
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);
    const { addScore, AddSceneData, addRelistenFragment } = useLuisterenStore();

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

    function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
        setactiveFragmentPlayerIndex(fragment.id);
        if (activeFragmentPlayerIndex === undefined) {
            start(fragment);
            addScore(100)
            addRelistenFragment(fragment.id);
        }
    }

    return (
        <>
            { shownFragments.map((fragment) => (
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
            )) }
        </>
    );
};

export default LuisterenfragmentPlayerRenderer;
