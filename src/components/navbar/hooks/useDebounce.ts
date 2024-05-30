import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500) => {
    const [debouncedText, setDebouncedText] = useState('');
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedText(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value]);

    return debouncedText;
};
