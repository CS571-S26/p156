import {createContext, useContext, useState} from "react";

interface SafeSearchContextType {
    safeSearch: boolean;
    setSafeSearch: (value: boolean) => void;
}

const SafeSearchContext = createContext<SafeSearchContextType | null>(null);

export function SafeSearchProvider({children}: { children: React.ReactNode }) {
    const [safeSearch, setSafeSearch] = useState(true);
    return (
        <SafeSearchContext value={{safeSearch, setSafeSearch}}>
            {children}
        </SafeSearchContext>
    );
}

export function useSafeSearch() {
    return useContext(SafeSearchContext)!;
}
