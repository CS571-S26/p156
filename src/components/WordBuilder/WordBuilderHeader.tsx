import WordBuilderRecommendation from "./WordBuilderRecommendation.tsx";
import {useSafeSearch} from "../../context/SafeSearch/SafeSearchHooks.ts";
import {type Dispatch, useEffect, useRef, useState} from "react";
import type {DictionaryWordType} from "../../api/types/dictionary.ts";
import {useNavigate} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getRecommendations, getWord} from "../../api/dictionaryApi.ts";
import {AxiosError} from "axios";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {WORDENGINEDEBOUNCETIME} from "../WordEngine/WordEngineConstants.ts";
import * as React from "react";

interface WordBuilderHeaderType {
    word: string
    setWord: Dispatch<React.SetStateAction<string>>,
    dictionaryWord: DictionaryWordType | null,
    setDictionaryWord: Dispatch<React.SetStateAction<DictionaryWordType | null>>
}

export function WordBuilderHeader({word, setWord, dictionaryWord, setDictionaryWord}: WordBuilderHeaderType) {
    const {safeSearch, setSafeSearch} = useSafeSearch();

    const [showRecommendations, setShowRecommendations] = useState(true);
    const [isSettingWord, setIsSettingWord] = useState(false);
    const isSettingWordRef = useRef(false);
    useEffect(() => {
        isSettingWordRef.current = isSettingWord;
    }, [isSettingWord]);

    const wordInputContainerRef = useRef<HTMLDivElement>(null);
    const wordInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    async function getAndSetDictionaryWord(word: string) {
        if (!word) {
            setDictionaryWord(null);
            return;
        }
        try {
            const dictionaryWord = await queryClient.fetchQuery({
                queryKey: ["dictionaryWord", word],
                queryFn: () => getWord(word)
            });
            setDictionaryWord(dictionaryWord);
        } catch (error: any) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                setDictionaryWord(null);
            } else {
                navigate("/error");
            }
        }
    }

    const debouncedQuery = useDebounce(word, WORDENGINEDEBOUNCETIME);
    const recommendations = useQuery({
        queryKey: ["recommendations", debouncedQuery, safeSearch],
        queryFn: () => getRecommendations(debouncedQuery, safeSearch),
        enabled: !!debouncedQuery,
        staleTime: 10 * 1000,
        gcTime: 0
    });
    useEffect(() => {
        if (recommendations.isError) {
            navigate("/error");
        }
    }, [navigate, recommendations.isError, recommendations.error]);

    async function selectWord(word: string) {
        setIsSettingWord(false);
        setShowRecommendations(false);
        await getAndSetDictionaryWord(word);
        wordInputRef.current?.blur();
    }

    useEffect(() => {
        async function handleClickOutside(e: MouseEvent) {
            console.log(isSettingWordRef.current);
            if (isSettingWordRef.current && wordInputContainerRef.current && !wordInputContainerRef.current.contains(e.target as Node)) {
                await selectWord(word);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return <>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <h1>Word</h1>
            {dictionaryWord && <button>Chained</button>}
        </div>
        <div ref={wordInputContainerRef}>
            <div style={{display: "flex"}}>
                <input
                    ref={wordInputRef}
                    value={word}
                    onChange={(e) => {
                        setIsSettingWord(true);
                        setWord(e.target.value);
                        setDictionaryWord(null);
                    }}
                    onSelect={() => {
                        setShowRecommendations(true);
                    }}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                            await selectWord(word);
                        }
                    }}
                />
                <button onClick={() => setSafeSearch(prev => !prev)}>Safe Search is {safeSearch ? "on" : "off"}</button>
            </div>
            {
                showRecommendations && recommendations.data &&
                recommendations.data.slice(0, 5).map(({id, word}) => {
                    return <WordBuilderRecommendation key={id} word={word} setWord={setWord} selectWord={selectWord}/>;
                })
            }
        </div>

    </>;
}