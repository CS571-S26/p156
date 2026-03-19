import api from "./axiosInstance.ts";

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