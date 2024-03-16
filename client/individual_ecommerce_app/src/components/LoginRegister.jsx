import { useState } from "react";
import { login } from "../API";
import { Navigate } from "react-router-dom";
import { register } from "../API";

export default function LoginRegister({ auth, setAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        const submitter = e.nativeEvent.submitter.value;
        const credentials = {username, password};
        if (submitter == "login") {
            login(credentials, setAuth);
        } else {
            register(credentials, setAuth);
        }
    }
    return (
        <div>
        {auth.id && <Navigate to="/" />}
            <h1>Login/Register</h1>
            <form onSubmit={submit}>
                <label>
                    Username: <input
                                type="text"
                                value={ username }
                                onChange={ e => setUsername(e.target.value)}
                                placeholder='username' />
                </label>
                <label>
                    Password: <input
                                type="password"
                                value={ password }
                                onChange={e => setPassword(e.target.value)}
                                placeholder='password' />
                </label>
                <button value="login" type="submit">Login</button>
                <button value="register" type="submit">Register</button>
            </form>
        </div>
    )
}