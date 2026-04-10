import api from "./axiosInstance.ts";
import type {DictionaryWordType} from "./types/dictionary.ts";

/**
 * Returns a list of word recommendations based on user input
 * @param query the user input
 * @param safeSearch profanity filtering flag
 */
export async function getRecommendations(query: string, safeSearch: boolean): Promise<string[]> {
    const response = await api.get("/dictionary/search/recommendations", {
        params: {q: query, safeSearch}
    });
    return response.data;
}

/**
 * Returns the lexical data of a word
 * @param word the selected word
 */
export async function getWord(word: string): Promise<DictionaryWordType> {
    const response = await api.get(`/dictionary/${word}`);
    return response.data;

}