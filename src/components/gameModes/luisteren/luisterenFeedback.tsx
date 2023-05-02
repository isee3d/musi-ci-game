import { useEffect } from "react";
import { useLuisterenStore } from "~/stores/gameModes/luisterenStore";
import { formatTime } from "~/utils/time";

interface LuisterenFeedbackProps {
    time: React.MutableRefObject<number>;
}

const LuisterenFeedback: React.FC<LuisterenFeedbackProps> = ({ time }) => {
    const { score, timePlayed, setTimePlayed } = useLuisterenStore();

    useEffect(() => {
        setTimePlayed(Date.now() - time.current);
    }, []);

    return (
        <>
            <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
                You played for { formatTime(timePlayed) }
            </h3>
            <h3 className='text-center text-4xl font-extrabold tracking-tight text-white'>
                You scored {score} points!
            </h3>
        </>
    )
};

export default LuisterenFeedback;
