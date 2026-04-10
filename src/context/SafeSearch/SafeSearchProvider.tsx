import {useState} from "react";
import {SafeSearchContext} from "./SafeSearchContext.tsx";

export function SafeSearchProvider({children}: { children: React.ReactNode }) {
    const [safeSearch, setSafeSearch] = useState(true);
    return (
        <SafeSearchContext value={{safeSearch, setSafeSearch}}>
            {children}
        </SafeSearchContext>
    );
}