import type {ChipType, CreateChipType} from "./types/chip.ts";
import api from "./axiosInstance.ts";

/**
 * Returns all Chips belonging to user (default and custom)
 */
export async function getChips(): Promise<ChipType[]> {
    const response = await api.get("/chips");
    return response.data;
}

/**
 * Creates a custom Chip
 * @param request The custom Chip to be created
 */
export async function createChip(request: CreateChipType): Promise<void> {
    const response = await api.post("/chips", request);
    return response.data;
}

export async function deleteChip(id: number): Promise<void> {
    const response = await api.delete(`/chips/${id}`);
    return response.data;
}