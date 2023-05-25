import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface StopwatchActions {
    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
}

const useStopwatch = (
    intervalMS = 1000,
) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const stopwatch = useRef<{
        started?: number;
        lastInterval?: number;
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
        if (!stopwatch.current.started) {
            stopwatch.current.started = ts;
            stopwatch.current.lastInterval = ts;
        }

        if (ts - (stopwatch.current.lastInterval || 0) >= intervalMS) {
            stopwatch.current.lastInterval = ts;
            setElapsedTime((elapsedTime) => {
                const newTime = elapsedTime + intervalMS;
                return newTime;
            });
        }

        stopwatch.current.requestId = window.requestAnimationFrame(run);
    };

    const start = useCallback(
        () => {
            setIsRunning(true);
            stopwatch.current.requestId = window.requestAnimationFrame(run);
        }, []);

    const pause = useCallback(() => {
        window.cancelAnimationFrame(stopwatch.current.requestId || 0);
        stopwatch.current.started = undefined;
        stopwatch.current.lastInterval = undefined;
        setIsRunning(false);
    }, []);

    const resume = useCallback(() => {
        if (!isRunning) {
            stopwatch.current.started = undefined;
            stopwatch.current.lastInterval = undefined;
            stopwatch.current.requestId = window.requestAnimationFrame(run);
            setIsRunning(true);
        }
    }, [isRunning]);

    const reset = useCallback(() => {
        window.cancelAnimationFrame(stopwatch.current.requestId || 0);
        stopwatch.current = {};
        setElapsedTime(0);
        setIsRunning(false);
    }, []);

    const actions = useMemo(
        () => ({ start, pause, resume, reset }),
        [start, pause, resume, reset],
    ) as StopwatchActions;

    useEffect(() => {
        return () => window.cancelAnimationFrame(stopwatch.current.requestId || 0);
    }, []);

    const convertedTime = useMemo(() => convertToTime(elapsedTime), [elapsedTime]);

    return {
        convertedTime,
        actions,
        isRunning,
    };
};

export default useStopwatch;
