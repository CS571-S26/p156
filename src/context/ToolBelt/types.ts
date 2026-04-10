import type {DictionaryWordType} from "../../api/types/dictionary.ts";

export interface ToolBeltUIContextType {
    isOpen: boolean,
    size: number
}

export interface ToolBeltTabContextType {
    activeTab: string | null,
    tabList: Record<string, WordTab>
    activeWordData: DictionaryWordType | null
}

export interface ToolBeltActionsContextType {
    openBelt: () => void,
    closeBelt: () => void,
    toggleBelt: () => void,
    resizeBelt: (size: number) => void,
    openWord: (word: string) => Promise<void>,
    closeTab: (word: string) => void,
    switchTab: (word: string) => void,
}

export interface WordTab {
    word: string,
    lastOpened: Date,
    wordData: DictionaryWordType
}