import { Container, Grid, Typography } from "@mui/material";
import Item from "./Item";

export default function Cart({ auth, cart, setCart }) {

    return (
        <Container>
            <Typography variant="h1" >Cart:</Typography>
            {cart ? <Grid container spacing={5}>{
            cart.map((item, i) =>
            <Item key={i} auth={auth} cart={cart} setCart={setCart} itemInfo={item}/>
            )} </Grid>:
            null}
        </Container>
    )
}