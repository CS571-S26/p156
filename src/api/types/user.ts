export interface CreateUserType {
    username: string,
    email: string,
    password: string
}

export interface UserType {
    id: number,
    username: string,
    email: string
    currentStreak: number,
    longestStreak: number
}w