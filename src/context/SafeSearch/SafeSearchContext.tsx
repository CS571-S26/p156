import {createContext} from "react";

interface SafeSearchContextType {
    safeSearch: boolean;
    setSafeSearch: (value: boolean) => void;
}

export const SafeSearchContext = createContext<SafeSearchContextType | null>(null);
