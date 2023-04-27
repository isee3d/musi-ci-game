import { useActor } from '@xstate/react';
import React from 'react';
import { InterpreterFrom } from 'xstate';
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine';

interface CountdownPlayerProps {
    service: InterpreterFrom<typeof spelenMachine>;
}

const CountdownPlayer: React.FC<CountdownPlayerProps> = ({ service }) => {
    const [state] = useActor(service);

    return (
        <div className="text-center text-4xl font-extrabold tracking-tight text-white">
            { state.toStrings()[1]?.split('.')[1] }
        </div>
    );
};

export default CountdownPlayer;
