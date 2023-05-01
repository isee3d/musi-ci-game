import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface CountdownActions {
    start: (ttc?: number) => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
}

const useCountDown = (
    timeToCount = 60, // Default is now in seconds
    intervalMS = 1000,
    onFinish?: () => void,
): [{ hours: string; minutes: string; seconds: string }, CountdownActions] => {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const timer = useRef<{
        started?: number;
        lastInterval?: number;
        timeToCount?: number;
        timeLeft?: number;
        requestId?: number;
    }>({});

    const convertToTime = (timeInMs: number) => {
        const seconds = Math.floor((timeInMs / 1000) % 60);
        const minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
        const hours = Math.floor((timeInMs / (1000 * 60 * 60)) % 24);

        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
        };
    };

    const run = (ts: number) => {
        if (!timer.current.started) {
            timer.current.started = ts;
            timer.current.lastInterval = ts;
        }

        const localInterval = Math.min(intervalMS, timer.current.timeLeft || Infinity);
        if (ts - (timer.current.lastInterval || 0) >= localInterval) {
            timer.current.lastInterval = (timer.current.lastInterval || 0) + localInterval;
            setTimeLeft((timeLeft) => {
                timer.current.timeLeft = timeLeft - localInterval;
                return timer.current.timeLeft || 0;
            });
        }

        if (ts - (timer.current.started || 0) < (timer.current.timeToCount || 0)) {
            timer.current.requestId = window.requestAnimationFrame(run);
        } else {
            timer.current = {};
            setTimeLeft(0);
            setIsRunning(false);
            if (onFinish) onFinish();
        }
    };

    const start = useCallback(
        (ttc?: number) => {
            window.cancelAnimationFrame(timer.current.requestId || 0);

            const newTimeToCount = ttc !== undefined ? ttc * 1000 : timeToCount * 1000; // Convert input to milliseconds
            timer.current.started = undefined;
            timer.current.lastInterval = undefined;
            timer.current.timeToCount = newTimeToCount;
            timer.current.requestId = window.requestAnimationFrame(run);

            setTimeLeft(newTimeToCount);
            setIsRunning(true);
        },
        [timeToCount],
    );

    const pause = useCallback(() => {
        window.cancelAnimationFrame(timer.current.requestId || 0);
        timer.current.started = undefined;
        timer.current.lastInterval = undefined;
        timer.current.timeToCount = timer.current.timeLeft;
        setIsRunning(false);
    }, []);

    const resume = useCallback(() => {
        if (!timer.current.started && timer.current.timeLeft && timer.current.timeLeft > 0) {
            window.cancelAnimationFrame(timer.current.requestId || 0);
            timer.current.requestId = window.requestAnimationFrame(run);
        }
    }, []);

    const reset = useCallback(() => {
        if (timer.current.timeLeft) {
            window.cancelAnimationFrame(timer.current.requestId || 0);
            timer.current = {};
            setTimeLeft(0);
        }
    }, []);

    const actions = useMemo(
        () => ({ start, pause, resume, reset }),
        [start, pause, resume, reset],
    );

    useEffect(() => {
        return () => window.cancelAnimationFrame(timer.current.requestId || 0);
    }, []);

    const convertedTime = useMemo(() => convertToTime(timeLeft), [timeLeft]);

    return [convertedTime, actions];
};

export default useCountDown;
