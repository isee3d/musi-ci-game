import Link from 'next/link';
import React, { useEffect } from 'react';
import { useUitdagingStore } from '~/stores/gameModes/uitdagingStore';
import { formatTime } from '~/utils/time';

interface UitdagingFeedbackProps {
    time: React.MutableRefObject<number>;
    levelId: string;
    sublevelId: string;
}

const UitdagingFeedback: React.FC<UitdagingFeedbackProps> = ({ time, levelId, sublevelId }) => {
    const { reset, getPercentageCorrectlyAnswered, timePlayed, setTimePlayed, startTime, endTime } = useUitdagingStore();

    useEffect(() => {
        setTimePlayed(Date.now() - time.current);
    }, []);

  return (
      <>
          <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
              You played for { formatTime(endTime - startTime) }
          </h3>

          <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
              You have { getPercentageCorrectlyAnswered() } % correct!
          </h3>

          <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
              Felicitaties! -- gebaseerd op % en config
          </h3>

          <div className='flex justify-center'>
              <Link
                  onClick={ () => reset() }
                  className={ `rounded-xl bg-white/10 p-4 text-center text-xl font-bold text-white hover:bg-white/20` }
                  href={ `/modeSelect/${levelId}/${sublevelId}` }
              >
                  <h3>Terug naar overzicht</h3>
              </Link>
          </div>
      </>
  );
};

export default UitdagingFeedback;
