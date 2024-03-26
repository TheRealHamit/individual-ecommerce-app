import { useEffect, useState } from "react"
import { getCart } from "../API";
import { Container, Grid, Typography } from "@mui/material";
import Item from "./Item";

export default function Cart() {

    const [cart, setCart] = useState(null);

    useEffect(() => {
        async function fetchCart() {
            setCart(await getCart());
        }
        fetchCart();
    }, [])

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