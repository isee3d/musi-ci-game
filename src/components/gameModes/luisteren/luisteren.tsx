import React, { useEffect, useRef } from 'react';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import BackToOverView from '~/components/gameModes/luisteren/backToOverView';
import PlayButtonsRenderer from '~/components/gameModes/luisteren/playButtonsRenderer';
import LuisterenFeedback from '~/components/gameModes/luisteren/luisterenFeedback';
import LuisterenfragmentPlayerRenderer from '~/components/gameModes/luisteren/luisterenfragmentPlayerRenderer';
import { LuisterenMachineContext } from '~/pages/[level]/[mode]';

interface LuisterenProps {
    fragmentsToShow: number;
    fragments: FragmentWithNotes[];
    levelName: string;
}

const Luisteren: React.FC<LuisterenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const { send } = LuisterenMachineContext.useActorRef();
    const isPlayingState = LuisterenMachineContext.useSelector(state => state.matches('playing'));
    const isfinishedPlayingState = LuisterenMachineContext.useSelector(state => state.matches('finishedListening'));
    const time = useRef(Date.now());

    useEffect(() => {
        send({
            type: "STARTROUND",
            levelFragments: fragments,
            fragmentsToShow: fragmentsToShow
        })
    }, [])

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { isPlayingState && <LuisterenfragmentPlayerRenderer /> }
            { isfinishedPlayingState && <LuisterenFeedback time={time} /> }
            <div className=" flex justify-center space-x-5">
                { isPlayingState && < PlayButtonsRenderer /> }
                { isfinishedPlayingState && <BackToOverView levelName={ levelName } /> }
            </div>
        </>
    );
};

export default Luisteren;
