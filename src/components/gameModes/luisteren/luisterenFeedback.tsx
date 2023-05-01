import React from 'react';

function formatTime(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours}h ${minutes}m ${seconds}s`;
}


interface LuisterenFeedbackProps {
    time: React.MutableRefObject<number>;
}

const LuisterenFeedback: React.FC<LuisterenFeedbackProps> = ({ time }) => {
    const timePlayed = Date.now() - time.current;
    return (
        <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
            You played for { formatTime(timePlayed) }
        </h3>
    )
};

export default LuisterenFeedback;
