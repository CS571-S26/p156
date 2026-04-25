import type {ChipType} from "./chip.ts";

export interface DictionaryWordType {
    id: number
    word: string,
    ipaPronunciation: string,
    respelling: string,
    audio: string,
    profanity: boolean,
    dictionaryWordEntries: DictionaryWordEntryType[]
}

export interface DictionaryWordEntryType {
    definition: string,
    partOfSpeech: string,
    example: string,
    chips: ChipType[]
}

export interface DictionaryRecommendationType {
    id: number,
    word: string
}