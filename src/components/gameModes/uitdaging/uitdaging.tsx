import React, { useEffect } from 'react';
import { isNullish } from 'types/nullish';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { CountdownTimings } from '~/components/gameModes/spelen/spelenMachine';
import UitdagingFragmentPlayerRenderer from '~/components/gameModes/uitdaging/UitdagingfragmentPlayerRenderer';
import StartUitdagingUI from '~/components/gameModes/uitdaging/startUitdagingRoundUI';
import UitdagingCountdownPlayer from '~/components/gameModes/uitdaging/uitdagingCountdownPlayer';
import UitdagingFeedback from '~/components/gameModes/uitdaging/uitdagingFeedback';
import useStopwatch from '~/hooks/useStopwatch';
import { UitdagingMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';

interface UitdagingProps {
    fragments: FragmentWithNotes[];
    levelId: string;
    sublevelId: string;
    fragmentsToShow: number;
    playTime: number | null | undefined;
    mode: string | undefined;
}

const Uitdaging: React.FC<UitdagingProps> = ({ fragments, levelId, sublevelId, fragmentsToShow, playTime, mode }) => {
    const { send } = UitdagingMachineContext.useActorRef();
    const startRoundState = UitdagingMachineContext.useSelector(state => state.matches('startRound'));
    const countdownState = UitdagingMachineContext.useSelector(state => state.matches('countdown'));
    const playingState = UitdagingMachineContext.useSelector(state => state.matches('playing'));
    const isFinishedState = UitdagingMachineContext.useSelector(state => state.matches('FinishedPlayingUitdagingMode'));
    const countdown = useStopwatch(1000)

    const { setLevelSublevelMode, reset, setStartTime } = useLuisterenStore();

    const { hours, minutes, seconds } = countdown.convertedTime;

    const countdownTimings: CountdownTimings = {
        one: 1000,
        two: 1000,
        three: 1000,
        go: 1000,
        soundInitialized: 1000
    }

    useEffect(() => {
        reset();
        setStartTime(Date.now());
        setLevelSublevelMode(parseInt(levelId), parseInt(sublevelId), parseInt(mode ?? '0'));
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
            { !isFinishedState &&
                <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                    Stopwatch:  { hours }:{ minutes }:{ seconds }
                </h3>
            }
            { startRoundState && <StartUitdagingUI /> }
            { countdownState && <UitdagingCountdownPlayer /> }
            { (playingState || countdownState) && <UitdagingFragmentPlayerRenderer /> }
            { isFinishedState && <UitdagingFeedback levelId={ levelId } sublevelId={ sublevelId } /> }
        </>
    );
};

export default Uitdaging;
