import {useDebounce} from "../../hooks/useDebounce.ts";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getRecommendations} from "../../api/dictionaryApi.ts";
import {useSafeSearch} from "../../context/SafeSearch/SafeSearchHooks.ts";
import WordRecommendation from "./WordRecommendation.tsx";

export function WordEngine() {
    const {safeSearch, setSafeSearch} = useSafeSearch();
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 100);
    const {data} = useQuery({
        queryKey: ["recommendations", debouncedQuery, safeSearch],
        queryFn: () => getRecommendations(debouncedQuery, safeSearch),
        enabled: !!debouncedQuery // don't run on empty strings
    });

    return <>
        <div className="d-flex flex-column">
            <div className="d-flex">
                <input value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button type="button" className="btn btn-primary" onClick={() => setSafeSearch(!safeSearch)}>Safe
                    guard {safeSearch ? "on" : "off"}</button>
            </div>
            <div>
                {data ?
                    data.map(word => <WordRecommendation word={word}/>)
                    : <p>No results</p>}
            </div>
        </div>
    </>;
}