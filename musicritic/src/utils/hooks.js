import { useRef, useEffect, useState } from 'react';

export const usePromise = (promise, initialData, deps) => {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        promise
            .then(result => {
                setData(result);
            })
            .catch(e => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, deps);

    return [data, error, loading];
};

// Made by Dan Abramov.
export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }

        return null;
    }, [delay]);
};
