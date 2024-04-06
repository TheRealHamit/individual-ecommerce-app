import { useContext, useEffect, useState } from "react"
import { getProducts } from "../API";
import Item from "./Item";
import { Container, Grid, Typography } from "@mui/material";
import StateContext from "./StateContext";

export default function Products() {
    const { productList } = useContext(StateContext);

    return (
        <Container>
            <Typography variant="h1">
                Products
            </Typography>
            {productList ? <Grid container spacing={5}>{
            productList.map((p, i) => {return <Item key={'Item' + i} itemInfo={p} />})
            }</Grid> : null}
        </Container>
    )
}