import {createContext} from "react";
import type {UserType} from "../../api/types/user.ts";

interface UserContextType {
    user: UserType | null
}

export const UserContext = createContext<UserContextType | null>(null);