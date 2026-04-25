import {useRef, useState} from "react";
import {createUser} from "../api/userApi.ts";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        if (!username || !email || !password || !confirmPassword) {
            setError({error: "All fields must be filled."});
            return;
        }
        if (password !== confirmPassword) {
            setError({error: "Password do not match."});
            return;
        }
        try {
            await createUser({username, email, password});
            navigate("/login");
        } catch (error: any) {
            if (error.response?.status === 400) {
                setError(error.response.data);
            } else {
                navigate("/error");
            }
        }
    };
    return <>
        <div style={{display: "flex", flexDirection: "column", width: "30vw", gap: "20px"}}>
            <div>
                <p>Username</p>
                <input ref={usernameRef}/>
            </div>
            <div>
                <p>Email</p>
                <input ref={emailRef} type="email"/>
            </div>
            <div>
                <p>Password</p>
                <input ref={passwordRef} type="password"/>
            </div>
            <div>
                <p>Confirm Password</p>
                <input ref={confirmPasswordRef} type="password"/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {Object.entries(error).map(([key, value]) => <p>{value}</p>)}
        </div>
    </>;
}