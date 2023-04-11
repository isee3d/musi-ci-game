import Link from 'next/link';
import React from 'react';

interface LevelProps {
    number: number;
    name: string;
    score: number;
    borderColor: string;
}

const Level: React.FC<LevelProps> = ({ number, name, score, borderColor }) => {
    const propNumberStyle = {
        borderColor: borderColor,
    };

    return (
        <Link
            className="flex rounded-xl bg-white/10 p-1 text-white hover:bg-white/20 "
            href={`/modeSelect/${name}`}
        >
        <div className="flex w-full items-center justify-between rounded-lg shadow-md">
            <div className="flex justify-start space-x-4">
                <div className=" flex h-16 w-16 items-center justify-center rounded-lg border-4 text-center text-2xl font-bold text-white" style={ propNumberStyle }>{ number }</div>
                <div className=" flex h-16 w-16 items-center justify-center text-2xl font-medium text-white">{ name }</div>
            </div>
            <div className=" flex h-16 w-16 items-center justify-center text-2xl font-medium text-white">{ score }</div>
        </div>
        </Link>
    );
};

export default Level;
