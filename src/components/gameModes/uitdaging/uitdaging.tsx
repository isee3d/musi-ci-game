import React, { useEffect } from 'react';
import { isNullish } from 'types/nullish';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { CountdownTimings } from '~/components/gameModes/spelen/spelenMachine';
import UitdagingFragmentPlayerRenderer from '~/components/gameModes/uitdaging/UitdagingfragmentPlayerRenderer';
import StartUitdagingUI from '~/components/gameModes/uitdaging/startUitdagingRoundUI';
import UitdagingCountdownPlayer from '~/components/gameModes/uitdaging/uitdagingCountdownPlayer';
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
    const isIdleState = UitdagingMachineContext.useSelector(state => state.matches('idle'));
    const startRoundState = UitdagingMachineContext.useSelector(state => state.matches('startRound'));
    const countdownState = UitdagingMachineContext.useSelector(state => state.matches('countdown'));
    const playingState = UitdagingMachineContext.useSelector(state => state.matches('playing'));
    const finished = UitdagingMachineContext.useSelector(state => state.matches('FinishedPlayingUitdagingMode'));
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
        // if(isIdleState){

        // }
        send({
            type: "STARTROUND",
            levelFragments: fragments,
            fragmentsToShow: fragmentsToShow,
            countdownTimings: countdownTimings,
            countdownActions: countdown.actions
        })
        countdown.actions.pause()
    }, [])


    // TODO: Add logic for having an Uitdaging mode for this level but not set the playtime...
    if (isNullish(playTime)) return null

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Speel met de klok
            </h3>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Time:  { hours }:{ minutes }:{ seconds }
            </h3>
            { startRoundState && <StartUitdagingUI levelName={ levelName } /> }
            { countdownState && <UitdagingCountdownPlayer /> }
            { playingState && <UitdagingFragmentPlayerRenderer /> }
            { finished && <h1 className="text-center text-4xl font-extrabold tracking-tight text-white">Einde van de uitdaging</h1> }
        </>
    );
};

export default Uitdaging;
