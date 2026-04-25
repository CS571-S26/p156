import {useDebounce} from "../../hooks/useDebounce.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getRecommendations} from "../../api/dictionaryApi.ts";
import {useSafeSearch} from "../../context/SafeSearch/SafeSearchHooks.ts";
import WordRecommendation from "./WordRecommendation.tsx";
import {useNavigate} from "react-router-dom";
import WordBuilderModal from "../WordBuilder/WordBuilderModal.tsx";
import {WORDENGINEDEBOUNCETIME} from "./WordEngineConstants.ts";

export function WordEngine() {
    const {safeSearch, setSafeSearch} = useSafeSearch();
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const debouncedQuery = useDebounce(query, WORDENGINEDEBOUNCETIME);
    const {data, isError, error} = useQuery({
        queryKey: ["recommendations", debouncedQuery, safeSearch],
        queryFn: () => getRecommendations(debouncedQuery, safeSearch),
        enabled: !!debouncedQuery,
        staleTime: 0,
        gcTime: 0
    });
    useEffect(() => {
        if (isError) {
            navigate("/error");
        }
    }, [navigate, isError, error]);

    return <>
        <div className="d-flex flex-column">
            <div className="d-flex">
                <input value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button onClick={() => setSafeSearch((prev) => !prev)}>Safe
                    guard {safeSearch ? "on" : "off"}</button>
                <button onClick={() => setIsModalOpen(true)}>Create Word Entry</button>
            </div>
            <div>
                {data && data.map(({id, word}) => <WordRecommendation key={id} word={word}/>)}
            </div>
            {isModalOpen && <WordBuilderModal setIsModalOpen={setIsModalOpen}></WordBuilderModal>}
        </div>
    </>;
}