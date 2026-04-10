import {QueryClient} from "@tanstack/react-query";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {WordTab} from "./types.ts";
import {getWord} from "../../api/dictionaryApi.ts";
import {ToolBeltActionsContext, ToolBeltTabContext, ToolBeltUIContext} from "./ToolBeltContext.tsx";
import {TOOL_BELT_MIN_SIZE} from "../../components/ToolBelt/ToolBeltConstants.ts";

const queryClient = new QueryClient();
const TAB_LIST_LENGTH = 5;

export function ToolBeltContextProvider({children}: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [size, setSize] = useState(TOOL_BELT_MIN_SIZE());
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [tabList, setTabList] = useState<Record<string, WordTab>>({});
    const tabListRef = useRef<Record<string, WordTab>>({});

    useEffect(() => {
        tabListRef.current = tabList;
    }, [tabList]);

    const openBelt = useCallback(() => setIsOpen(true), []);
    const closeBelt = useCallback(() => setIsOpen(false), []);
    const toggleBelt = useCallback(() => setIsOpen(prev => !prev), []);
    const resizeBelt = useCallback((size: number) => setSize(size), []);
    const switchTab = useCallback((word: string) => {
        setActiveTab(word);
        setTabList(prev => ({
            ...prev,
            [word]: {
                ...prev[word],
                lastOpened: new Date()
            }
        }));
    }, []);
    const closeTab = useCallback((word: string) => {
        setTabList((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[word]: _, ...rest} = prev;
            return rest;
        });
        setActiveTab((prev) => {
            if (prev !== word) return prev;
            return Object.keys(tabListRef.current).find(key => key !== word) ?? null;
        });
    }, []);
    const openWord = useCallback(async (word: string) => {
        const data = await queryClient.fetchQuery({
            queryKey: ["openWord", word],
            queryFn: () => getWord(word)
        });
        if (word in tabListRef.current) {
            switchTab(word);
        } else {
            if (Object.keys(tabListRef.current).length < TAB_LIST_LENGTH) {
                setTabList((prev) => ({
                    ...prev,
                    [word]: {
                        word: word,
                        lastOpened: new Date(),
                        wordData: data
                    }
                }));
            } else {
                let lru: { key: string, lastOpened: Date } | null = null;
                for (const [key, value] of Object.entries(tabListRef.current)) {
                    if (!lru || value.lastOpened < lru.lastOpened) {
                        lru = {key: key, lastOpened: value.lastOpened};
                    }
                }
                if (lru) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const {[lru.key]: _, ...rest} = tabListRef.current;
                    setTabList(({
                        ...rest,
                        [word]: {
                            word: word,
                            lastOpened: new Date(),
                            wordData: data
                        }
                    }));
                }
            }
            setActiveTab(word);
        }
        openBelt();
    }, [switchTab, openBelt]);

    const uiValues = useMemo(() => ({
        isOpen,
        size,
    }), [isOpen, size]);

    const tabValues = useMemo(() => ({
        activeTab,
        tabList,
        activeWordData: activeTab ? tabList[activeTab]?.wordData ?? null : null
    }), [activeTab, tabList]);

    const actionsValues = useMemo(() => ({
        openBelt,
        closeBelt,
        toggleBelt,
        resizeBelt,
        openWord,
        closeTab,
        switchTab
    }), [closeBelt, closeTab, openBelt, openWord, resizeBelt, switchTab, toggleBelt]);


    return (
        <ToolBeltActionsContext value={actionsValues}>
            <ToolBeltUIContext value={uiValues}>
                <ToolBeltTabContext value={tabValues}>
                    {children}
                </ToolBeltTabContext>
            </ToolBeltUIContext>
        </ToolBeltActionsContext>
    );
}