import React from 'react';
import { LuisterenMachineContext } from '~/pages/[level]/[mode]';

const PlayButtonsRenderer: React.FC = () => {
    const { send } = LuisterenMachineContext.useActorRef();

    return (
        <>
            <button
                onClick={ () => send("SHUFFLEFRAGMENTS") }
                className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
                <h3 className="text-center text-xl font-bold">Play knop</h3>
            </button>
            <button
                onClick={ () => send("FINISHEDLISTENING") }
                className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
            >
                <h3 className="text-center text-xl font-bold">Stop Luisteren</h3>
            </button>
        </>
    )
};

export default PlayButtonsRenderer;
