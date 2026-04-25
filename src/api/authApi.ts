import api from "./axiosInstance.ts";
import type {JwtType, LoginType} from "./types/auth.ts";

/**
 * Logs in a user
 * @param request the email and password of the user account
 */
export async function login(request: LoginType): Promise<JwtType> {
    const response = await api.post("/auth/login", request);
    return response.data;
}

/**
 * Creates new access token using a valid refresh token
 */
export async function refresh(): Promise<JwtType> {
    const response = await api.post("/auth/refresh");
    return response.data;
}

/**
 * Logs user out by attaching an expired refresh token to the browser
 */
export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}