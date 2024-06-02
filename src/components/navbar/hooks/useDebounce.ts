import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500) => {
    const [debouncedText, setDebouncedText] = useState('');
    const [isloading, setIsloading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedText(value);
            setIsloading(false);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return [debouncedText, isloading, setIsloading];
};
