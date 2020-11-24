import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';


export function useWindowScroll() {
    const [scrollTop, setScrollTop] = useState({
        top: document.body.scrollTop || document.documentElement.scrollTop
    });

    const onScroll = useDebounce(() => {
        setScrollTop({
            top: document.body.scrollTop || document.documentElement.scrollTop
        })
    });


    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return (() => {
            window.removeEventListener('scroll', onScroll, false)
        })
    }, [onScroll])

    return scrollTop;
}
