import React, { useEffect } from 'react';
import { useMachine } from "@xstate/react";
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import StartRoundUI from '~/components/gameModes/spelen/startRoundUI';
import CountdownPlayer from '~/components/gameModes/spelen/countdownPlayer';
import FragmentPlayerRenderer from '~/components/gameModes/spelen/fragmentPlayerRenderer';

interface SpelenProps {
    fragments: FragmentWithNotes[];
    levelName: string;
    fragmentsToShow: number;
}

const Spelen: React.FC<SpelenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const [state, send, service] = useMachine(spelenMachine, {
        actions: {
            onPlayingEntry: playAudio,
        },
        devTools: true,
    })

    useEffect(() => {
        send({ type: "STARTROUND", levelFragments: fragments, fragmentsToShow: fragmentsToShow })
    }, [])

    async function playAudio() {
        await start(state.context.activeFragment, { onFinishedPlaying: () => send("SOUNDFINISHED") })
    }

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { state.matches('startRound') && <StartRoundUI levelName={levelName} service={service}/> }
            { state.matches('countdown') &&<CountdownPlayer service={service}/> }
            { state.matches('playing') && <FragmentPlayerRenderer service={service}/> }
        </>
    );
};

export default Spelen;
