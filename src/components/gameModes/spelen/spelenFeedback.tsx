import Link from 'next/link';
import React, { useEffect } from 'react';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';
import { useSpelenStore } from '~/stores/gameModes/spelenStore';
import { formatTime } from '~/utils/time';

interface SpelenFeedbackProps {
    time: React.MutableRefObject<number>;
    levelId: string;
    sublevelId: string;
}

const SpelenFeedback: React.FC<SpelenFeedbackProps> = ({ time, levelId, sublevelId }) => {
    const { reset, getPercentageCorrectlyAnswered, timePlayed, setTimePlayed } = useLuisterenStore();

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
                    onClick={() => reset()}
                    className={ `rounded-xl bg-white/10 p-4 text-center text-xl font-bold text-white hover:bg-white/20` }
                    href={ `/modeSelect/${levelId}/${sublevelId}` }
                >
                    <h3>Terug naar overzicht</h3>
                </Link>
            </div>
        </>
    );
};

export default SpelenFeedback;
