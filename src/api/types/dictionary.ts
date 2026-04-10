export interface DictionaryWordType {
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
    formality: string,
    register: string,
    domain: string,
    currency: string,
    synonyms: string[],
    antonyms: string[]
}