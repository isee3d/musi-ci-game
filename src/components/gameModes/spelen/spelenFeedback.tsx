import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSpelenStore } from '~/stores/gameModes/spelenStore';
import { formatTime } from '~/utils/time';

interface SpelenFeedbackProps {
    time: React.MutableRefObject<number>;
    levelName: string;
}

const SpelenFeedback: React.FC<SpelenFeedbackProps> = ({ time, levelName }) => {
    const { getPercentageCorrectlyAnswered, timePlayed, setTimePlayed } = useSpelenStore();

    useEffect(() => {
        setTimePlayed(Date.now() - time.current);
    }, []);

    return (
        <>
            <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
                You played for { formatTime(timePlayed) }
            </h3>

            <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
                You have { getPercentageCorrectlyAnswered() } % correct!
            </h3>

            <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
                Felicitaties! -- gebaseerd op % en config
            </h3>

            <div className='flex justify-center'>
                <Link
                    className={ `rounded-xl bg-white/10 p-4 text-center text-xl font-bold text-white hover:bg-white/20` }
                    href={ `/modeSelect/${levelName}` }
                >
                    <h3>Terug naar overzicht</h3>
                </Link>
            </div>
        </>
    );
};

export default SpelenFeedback;
