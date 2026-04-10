import {useContext} from "react";
import {SafeSearchContext} from "./SafeSearchContext.tsx";

export function useSafeSearch() {
    const context = useContext(SafeSearchContext);
    if (!context) throw new Error("useSafeSearch must be used within SafeSearchProvider");
    return context;
}