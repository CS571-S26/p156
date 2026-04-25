import {createContext} from "react";

interface SafeSearchContextType {
    safeSearch: boolean;
    setSafeSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SafeSearchContext = createContext<SafeSearchContextType | null>(null);
