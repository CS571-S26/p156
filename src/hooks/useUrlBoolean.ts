import {useSearchParams} from "react-router-dom";

/**
 * Manages the boolean state of a url query parameter, returning the current state and a setter.
 * Pushes url state to history when parameter is true (back button removes the parameter), and replaces latest entry on false (avoids duplicate parameters).
 *
 * @param name the query parameter to manage
 * @example const [value, setValue] = useUrlBoolean("build")
 * @returns A tuple of [value, setValue]
 */
export function useUrlBoolean(name: string): [value: boolean, setValue: (newValue: boolean) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get(name) === "true";

    function setValue(newValue: boolean) {
        // Idempotency safeguard to avoid redundant history
        if (value === newValue) return;
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (newValue) {
                next.set(name, "true");
            } else {
                next.delete(name);
            }
            return next;
        }, {replace: !newValue});
    }

    return [value, setValue];
}