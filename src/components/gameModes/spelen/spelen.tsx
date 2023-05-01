import React, { useEffect } from 'react';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import StartRoundUI from '~/components/gameModes/spelen/startRoundUI';
import CountdownPlayer from '~/components/gameModes/spelen/countdownPlayer';
import FragmentPlayerRenderer from '~/components/gameModes/spelen/fragmentPlayerRenderer';
import { SpelenMachineContext } from '~/pages/[level]/[mode]';
import { CountdownTimings } from '~/components/gameModes/spelen/spelenMachine';

interface SpelenProps {
    fragments: FragmentWithNotes[];
    levelName: string;
    fragmentsToShow: number;
}

const Spelen: React.FC<SpelenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const { send } = SpelenMachineContext.useActorRef();
    const startRoundState = SpelenMachineContext.useSelector(state => state.matches('startRound'));
    const countdownState = SpelenMachineContext.useSelector(state => state.matches('countdown'));
    const playingState = SpelenMachineContext.useSelector(state => state.matches('playing'));

    const countdownTimings: CountdownTimings = {
        one: 1000,
        two: 1000,
        three: 1000,
        go: 1000,
        soundInitialized: 1000
    }

    useEffect(() => {
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
            { startRoundState && <StartRoundUI levelName={ levelName } /> }
            { countdownState && <CountdownPlayer /> }
            { playingState && <FragmentPlayerRenderer levelName={ levelName } /> }
        </>
    );
};

export default Spelen;
