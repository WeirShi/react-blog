import { useRef, useEffect, useCallback } from 'react';

export function useThrottle(fn, wait = 300) {
    const { current } = useRef({ fn, timer: null });
    useEffect(function () {
      current.fn = fn;
    }, [current, fn]);
  
    return useCallback(function f(...args) {
      if (!current.timer) {
        current.timer = setTimeout(() => {
          delete current.timer;
        }, wait);
        current.fn.call(this, ...args);
      }
    }, [current, wait]);
  }