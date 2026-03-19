import {useEffect, useState} from "react";

export function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = window.setTimeout(() => setDebouncedValue(value), delay); // async
        return () => window.clearTimeout(timer); // cleanup function (remove the older timer if user updates value)
    }, [value, delay]);

    return debouncedValue;
}