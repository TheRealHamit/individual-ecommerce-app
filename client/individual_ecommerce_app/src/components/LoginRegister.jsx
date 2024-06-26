import { useContext, useState } from "react";
import { login } from "../API";
import { Navigate } from "react-router-dom";
import { register } from "../API";

import Button from '@mui/material/Button';
import { Container, TextField, Typography } from "@mui/material";
import StateContext from "./StateContext";

export default function LoginRegister() {
    const { auth, setAuth } = useContext(StateContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        const submitter = e.nativeEvent.submitter.value;
        const credentials = {username, password};

        if (submitter == "login") {
            setAuth(await login(credentials));
        } else {
            setAuth(await register(credentials));
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