import React, { useEffect, useRef } from 'react';
import { isNullish } from 'types/nullish';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { CountdownTimings } from '~/components/gameModes/spelen/spelenMachine';
import UitdagingFragmentPlayerRenderer from '~/components/gameModes/uitdaging/UitdagingfragmentPlayerRenderer';
import StartUitdagingUI from '~/components/gameModes/uitdaging/startUitdagingRoundUI';
import UitdagingCountdownPlayer from '~/components/gameModes/uitdaging/uitdagingCountdownPlayer';
import UitdagingFeedback from '~/components/gameModes/uitdaging/uitdagingFeedback';
import useCountDown from '~/hooks/useCountdown';
import { UitdagingMachineContext } from '~/pages/[level]/[mode]';

interface UitdagingProps {
    fragments: FragmentWithNotes[];
    levelName: string;
    fragmentsToShow: number;
    playTime: number | null | undefined;
}

const Uitdaging: React.FC<UitdagingProps> = ({ fragments, levelName, fragmentsToShow, playTime }) => {
    const { send } = UitdagingMachineContext.useActorRef();
    const startRoundState = UitdagingMachineContext.useSelector(state => state.matches('startRound'));
    const countdownState = UitdagingMachineContext.useSelector(state => state.matches('countdown'));
    const playingState = UitdagingMachineContext.useSelector(state => state.matches('playing'));
    const isFinishedState = UitdagingMachineContext.useSelector(state => state.matches('FinishedPlayingUitdagingMode'));

    const time = useRef(Date.now());

    const countdown = useCountDown(playTime ?? 0, () => send('FINISHEDPLAYING'));
    const { hours, minutes, seconds } = countdown.convertedTime;

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
            countdownTimings: countdownTimings,
            countdownActions: countdown.actions
        })
    }, [])


    // TODO: Add logic for having an Uitdaging mode for this level but not set the playtime...
    if (isNullish(playTime)) return null

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Speel met de klok
            </h3>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Countdown:  { hours }:{ minutes }:{ seconds }
            </h3>
            { startRoundState && <StartUitdagingUI /> }
            { countdownState && <UitdagingCountdownPlayer /> }
            { playingState && <UitdagingFragmentPlayerRenderer /> }
            { isFinishedState && <UitdagingFeedback time={ time } levelName={ levelName } /> }
        </>
    );
};

export default Uitdaging;
