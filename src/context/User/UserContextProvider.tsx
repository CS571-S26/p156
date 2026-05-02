import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {getMe} from "../../api/userApi.ts";
import useAuthContext from "../Auth/AuthContextHook.ts";
import {useEffect, useMemo} from "react";
import {UserContext} from "./UserContext.tsx";

export default function UserContextProvider({children}: { children: React.ReactNode }) {
    const {isAuthenticated} = useAuthContext();
    const navigate = useNavigate();
    const {data, isError} = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        enabled: isAuthenticated
    });

    const value = useMemo(() => ({
        user: data ? data : null
    }), [data]);

    useEffect(() => {
        if (isError) {
            navigate("/error");
        }
    }, [isError, navigate]);

    return <UserContext value={value}>
        {children}
    </UserContext>;
}