import React from 'react';
import { SpelenMachineContext } from '~/pages/[level]/[mode]';

const CountdownPlayer: React.FC = () => {
    const [state] = SpelenMachineContext.useActor();

    return (
        <div className="text-center text-4xl font-extrabold tracking-tight text-white">
            { state.toStrings()[1]?.split('.')[1] }
        </div>
    );
};

export default CountdownPlayer;
