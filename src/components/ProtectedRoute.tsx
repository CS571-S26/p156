import useAuthContext from "../context/Auth/AuthContextHook.ts";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const {token} = useAuthContext();
    return token ? <Outlet/> : <Navigate to={"/login"}/>;
}