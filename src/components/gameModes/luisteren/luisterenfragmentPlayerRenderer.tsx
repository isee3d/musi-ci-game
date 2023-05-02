import React, { useState } from 'react';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { LuisterenMachineContext } from '~/pages/[level]/[mode]';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';

const LuisterenfragmentPlayerRenderer: React.FC = () => {
    const shownFragments = LuisterenMachineContext.useSelector(state => state.context.shownFragments);
    const [activeFragmentPlayerIndex, setactiveFragmentPlayerIndex] = useState<number | undefined>(undefined);
    const { addScore } = useLuisterenStore();

    function onFragmentPlayerClicked(fragment: FragmentWithNotes) {
        setactiveFragmentPlayerIndex(fragment.id);
        if (activeFragmentPlayerIndex === undefined) {
            start(fragment);
            addScore(100)
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
