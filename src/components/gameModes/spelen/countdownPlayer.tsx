import React from 'react';
import { SpelenMachineContext } from '~/pages/[subLevel]/[mode]';

const CountdownPlayer: React.FC = () => {
    const spelenStates = SpelenMachineContext.useSelector(state => state.toStrings())

    return (
        <div className="text-center text-4xl font-extrabold tracking-tight text-white">
            { spelenStates[1]?.split('.')[1] }
        </div>
    );
};

export default CountdownPlayer;
