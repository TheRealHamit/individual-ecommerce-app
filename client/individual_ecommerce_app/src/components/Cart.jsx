import { Container, Grid, Typography } from "@mui/material";
import Item from "./Item";
import { useContext } from "react";
import StateContext from "./StateContext";

export default function Cart() {
    const { cart } = useContext(StateContext);

    return (
        <Container>
            <Typography variant="h1" >Cart:</Typography>
            {cart ? <Grid container spacing={5}>{
            cart.map((item, i) =>
            <Item key={i} itemInfo={item}/>
            )} </Grid>:
            null}
        </Container>
    )
}