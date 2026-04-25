export interface ChipType {
    id: number,
    userId: number | null
    category: string,
    label: string,
    color: string,
    createdAt: string
}

export interface CreateChipType {
    category: string,
    label: string,
    color: string,
}