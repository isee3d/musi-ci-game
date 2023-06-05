import React from 'react';
import { UitdagingMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { useUitdagingStore } from '~/stores/gameModes/uitdagingStore';


const StartUitdagingUI: React.FC = () => {
    const { send } = UitdagingMachineContext.useActorRef();
    const { setStartTime } = useUitdagingStore();


    return (
        <div className='flex justify-center space-x-5'>
            <button
                onClick={ () => {
                    send("STARTCOUNTDOWN")
                    setStartTime(Date.now())
                } }
                className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
                <h3 className="text-center text-xl font-bold">Start</h3>
            </button>
        </div>
    )
};

export default StartUitdagingUI;
