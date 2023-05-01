import Link from 'next/link';
import React from 'react';
import { UitdagingMachineContext } from '~/pages/[level]/[mode]';

interface StartUIProps {
    levelName: string;
}

const StartUitdagingUI: React.FC<StartUIProps> = ({ levelName }) => {
    const { send } = UitdagingMachineContext.useActorRef();

    return (
        <div className='flex justify-center space-x-5'>
            <button
                onClick={ () => send("STARTCOUNTDOWN") }
                className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
                <h3 className="text-center text-xl font-bold">Start</h3>
            </button>
            {/* <Link
                onClick={ () => send("FINISHEDPLAYING") }
                href={ `/modeSelect/${levelName}` }
                className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
            >
                <h3 className="text-center text-xl font-bold">Terug naar overzicht</h3>
            </Link> */}
        </div>
    )
};

export default StartUitdagingUI;
