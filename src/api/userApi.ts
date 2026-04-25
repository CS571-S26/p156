import api from "./axiosInstance.ts";
import type {CreateUserType, UserType} from "./types/user.ts";

/**
 * Fetches user data after login
 */
export async function getMe(): Promise<UserType> {
    const response = await api.get("/users/me");
    return response.data;
}

/**
 * Registers a user
 * @param request the data used to register
 */
export async function createUser(request: CreateUserType): Promise<UserType> {
    const response = await api.post("/users", request);
    return response.data;
}