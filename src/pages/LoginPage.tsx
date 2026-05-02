import {useRef, useState} from "react";
import useAuthContext from "../context/Auth/AuthContextHook.ts";

export default function LoginPage() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<Record<string, string> | null>(null);
    const {loginUser} = useAuthContext();
    const handleSubmit = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!email || !password) {
            setError({"error": "All fields must be filled"});
            return;
        }
        try {
            await loginUser(email, password);
        } catch (error: any) {
            if ([400, 401].includes(error.response?.status)) {
                setError(error.response.data);
            } else {
                console.log("here")
            }
        }
    };
    return <>
        <div style={{display: "flex", flexDirection: "column", width: "30vw", gap: "20px"}}>
            <div>
                <p>Email</p>
                <input ref={emailRef} type="email"/>
            </div>
            <div>
                <p>Password</p>
                <input ref={passwordRef} type="password"/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        {error && Object.entries(error).map(([key, value]) => <p id={key}>{value}</p>)}
    </>;
}