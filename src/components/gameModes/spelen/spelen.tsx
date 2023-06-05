import React, { useEffect, useRef } from 'react';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import StartRoundUI from '~/components/gameModes/spelen/startRoundUI';
import CountdownPlayer from '~/components/gameModes/spelen/countdownPlayer';
import FragmentPlayerRenderer from '~/components/gameModes/spelen/fragmentPlayerRenderer';
import { SpelenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { CountdownTimings } from '~/components/gameModes/spelen/spelenMachine';
import SpelenFeedback from '~/components/gameModes/spelen/spelenFeedback';
import { useSpelenStore } from '~/stores/gameModes/spelenStore';

interface SpelenProps {
    fragments: FragmentWithNotes[];
    levelId: string;
    sublevelId: string;
    fragmentsToShow: number;
}

const Spelen: React.FC<SpelenProps> = ({ fragments, fragmentsToShow, sublevelId, levelId }) => {
    const { send } = SpelenMachineContext.useActorRef();
    const startRoundState = SpelenMachineContext.useSelector(state => state.matches('startRound'));
    const countdownState = SpelenMachineContext.useSelector(state => state.matches('countdown'));
    const playingState = SpelenMachineContext.useSelector(state => state.matches('playing'));
    const finishedState = SpelenMachineContext.useSelector(state => state.matches('FinishedPlayingSpelenMode'));

    const { setStartTime, setModeData } = useSpelenStore();

    const time = useRef(Date.now());

    const countdownTimings: CountdownTimings = {
        one: 1000,
        two: 1000,
        three: 1000,
        go: 1000,
        soundInitialized: 1000
    }

    useEffect(() => {
        setStartTime(Date.now());
        setModeData({ level: levelId, subLevel: sublevelId, mode: "spelen" })
        send({
            type: "STARTROUND",
            levelFragments: fragments,
            fragmentsToShow: fragmentsToShow,
            countdownTimings: countdownTimings
        })
    }, [])

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { startRoundState && <StartRoundUI levelId={ levelId } sublevelId={ sublevelId} /> }
            { countdownState && <CountdownPlayer /> }
            { (playingState || countdownState) && <FragmentPlayerRenderer /> }
            { finishedState && <SpelenFeedback time={ time } levelId={ levelId } sublevelId={sublevelId} /> }
        </>
    );
};

export default Spelen;
