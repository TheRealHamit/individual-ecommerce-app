import { useEffect, useState } from "react"
import { getProducts } from "../API";
import Item from "./Item";
import { Container, Grid, Typography } from "@mui/material";

export default function Products({ auth, cart, setCart }) {
    const [products, setProducts] = useState();

    useEffect(() => {
        async function fetchProducts() {
            const res = await getProducts();
            const p = res.map(i => ({...i, buyable: true}));
            await setProducts(p);
        }
        fetchProducts();
    }, [])
    return (
        <Container>
            <Typography variant="h1">
                Products
            </Typography>
            {products ? <Grid container spacing={5}>{
            products.map((p, i) => {return <Item key={'Item' + i} auth={auth} cart={cart} setCart={setCart} itemInfo={p} />})
            }</Grid> : null}
        </Container>
    )
}