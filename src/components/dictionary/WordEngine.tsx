import {useDebounce} from "../../hooks/useDebounce.ts";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getRecommendations} from "../../api/dictionaryApi.ts";
import {useSafeSearch} from "../../context/SafeSearchContext.tsx";

export function WordEngine() {
    const {safeSearch, setSafeSearch} = useSafeSearch();
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 100);
    const {data} = useQuery({
        queryKey: ["recommendations", debouncedQuery],
        queryFn: () => getRecommendations(debouncedQuery, safeSearch),
        enabled: !!debouncedQuery // don't run on empty strings
    });

    return <>
        <div className="d-flex flex-column">
            <div className="d-flex">
                <input value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button onClick={() => setSafeSearch(!safeSearch)}>Safe guard {safeSearch ? "on" : "off"}</button>
            </div>
            <div>
                {data ? data.map(word => <p key={word}>{word}</p>) : <p>No results</p>}
            </div>
        </div>
    </>;
}