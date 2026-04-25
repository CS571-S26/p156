import {createContext} from "react";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);