import { useState } from "react";
import { login } from "../API";
import { Navigate } from "react-router-dom";
import { register } from "../API";

import Button from '@mui/material/Button';
import { Container, TextField, Typography } from "@mui/material";

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
        <Container>
        {auth && <Navigate to="/" />}
            <Typography variant="h1" >Login/Register</Typography>
            <form onSubmit={submit}>
                <TextField onChange={e => setUsername(e.target.value)} label="Username" />
                <TextField onChange={e => setPassword(e.target.value)} label="Password" />
                <Button value="login" type="submit" >Login</Button>
                <Button value="register" type="submit" >Register</Button>
            </form>
        </Container>
    )
}