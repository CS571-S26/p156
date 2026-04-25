import {useEffect, useRef, useState} from "react";
import {login, logout, refresh} from "../../api/authApi.ts";
import {AuthContext} from "./AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import api from "../../api/axiosInstance.ts";

export function AuthContextProvider({children}: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const tokenRef = useRef(token);
    const isAuthenticated = token !== null;
    const navigate = useNavigate();

    const loginUser = async (email: string, password: string) => {
        const response = await login({email, password});
        setToken(response.token);
        tokenRef.current = response.token;
        navigate("/");
    };
    const logoutUser = async () => {
        try {
            await logout(); // Replace current refresh token with an expired one
            setToken(null);
            tokenRef.current = null;
            return navigate("/");
        } catch (error: any) {
            return navigate("/error");
        }
    };

    // Refresh token on app load
    useEffect(() => {
        const silentRefresh = async () => {
            try {
                const response = await refresh();
                setToken(response.token);
                tokenRef.current = response.token;
            } catch (error: any) {
                // A null token will cause a redirect to the login page when accessing a ProtectedRoute
                setToken(null);
                tokenRef.current = null;
            }
        };
        silentRefresh();
    }, []);

    // Axios interceptors
    useEffect(() => {
        const interceptorId = api.interceptors.request.use(config => {
            if (tokenRef.current !== null) {
                config.headers.Authorization = `Bearer ${tokenRef.current}`;
            }
            return config;
        });
        // Remove interceptors upon unmount to avoid redundancy during React Strict Mode
        return () => api.interceptors.request.eject(interceptorId);
    }, []);

    useEffect(() => {
        const interceptorId = api.interceptors.response.use(response => response, async error => {
            if (error.response.status === 401 && !error.config._retry) {
                error.config._retry = true; // avoid infinite retry requests
                try {
                    const response = await refresh();
                    setToken(response.token);
                    tokenRef.current = response.token;
                    error.config.headers.Authorization = `Bearer ${response.token}`;
                    return api(error.config); // retry original request
                } catch (error: any) {
                    setToken(null);
                    tokenRef.current = null;
                    return navigate("/login");
                }
            }
            return Promise.reject(error);
        });
        // Remove interceptors upon unmount to avoid redundancy during React Strict Mode
        return () => api.interceptors.response.eject(interceptorId);
    }, []);

    return (
        <AuthContext value={{token, isAuthenticated, loginUser, logoutUser}}>
            {children}
        </AuthContext>

    );

}
