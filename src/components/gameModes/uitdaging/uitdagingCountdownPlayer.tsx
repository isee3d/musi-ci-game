import React from 'react';
import { SpelenMachineContext, UitdagingMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';

const UitdagingCountdownPlayer: React.FC = () => {
    const spelenStates = UitdagingMachineContext.useSelector(state => state.toStrings())

    return (
        <div className="text-center text-4xl font-extrabold tracking-tight text-white">
            { spelenStates[1]?.split('.')[1] }
        </div>
    );
};

export default UitdagingCountdownPlayer;
