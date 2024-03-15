import { useState } from "react";
import { login, attemptLoginWithToken } from "../API";

export default function Login({ setAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        console.log(username, password)
        login({username, password}, setAuth)
    }
    return (
        <div>
            <h1>Login</h1>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}