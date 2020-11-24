import { useRef, useEffect, useCallback } from 'react';

export function useDebounce(fn, wait = 300, dep= []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(() => {
        current.fn = fn;
    }, [current, fn]);

    return useCallback(function(...args) {
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn.call(this, ...args);
        }, wait)
    }, [current, wait])
}
