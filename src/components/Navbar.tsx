import {Link} from "react-router-dom";
import useAuthContext from "../context/Auth/AuthContextHook.ts";
import {useUserContext} from "../context/User/UserContextHooks.ts";

export default function Navbar() {
    const {isAuthenticated, logoutUser} = useAuthContext();
    const {user} = useUserContext();
    return (
        <nav style={{display: "flex", justifyContent: "space-evenly"}}>
            <Link to="/">Home</Link>
            {!isAuthenticated && <Link to="/register">Register</Link>}
            {!isAuthenticated && <Link to="/login">Login</Link>}
            {isAuthenticated && <Link to="/inventory">Inventory</Link>}
            {isAuthenticated && <button onClick={logoutUser}>Logout</button>}
            {isAuthenticated && user && <p>Welcome back, {user!.username}</p>}
            {isAuthenticated && user &&  <p>Streak: {user!.currentStreak}</p>}
        </nav>
    );
}