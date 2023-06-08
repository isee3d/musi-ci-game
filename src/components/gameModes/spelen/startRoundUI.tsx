import Link from 'next/link';
import React from 'react';
import { SpelenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';
import { useSpelenStore } from '~/stores/gameModes/spelenStore';

interface StartUIProps {
    levelId: string;
    sublevelId: string;
}

const StartUI: React.FC<StartUIProps> = ({ levelId, sublevelId }) => {
    const { send } = SpelenMachineContext.useActorRef();
    const { reset } = useLuisterenStore()

    return (
        <div className='flex justify-center space-x-5'>
            <button
                onClick={ () => send("STARTCOUNTDOWN")}
                className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
                <h3 className="text-center text-xl font-bold">Start</h3>
            </button>
            <Link
                onClick={ () => {
                    reset()
                    send("CANCELLEDPLAYING")
                }  }
                href={ `/modeSelect/${levelId}/${sublevelId}` }
                className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
            >
                <h3 className="text-center text-xl font-bold">Annuleren</h3>
            </Link>
        </div>
    )
};

export default StartUI;
