import { useContext, useEffect, useState } from "react"
import { getProducts } from "../API";
import Item from "./Item";
import { Container, Grid, Typography, TextField } from "@mui/material";
import StateContext from "./StateContext";

export default function Products() {
    const { productList } = useContext(StateContext);
    const [filter, setFilter] = useState("");

    function createItems() {
        const items = <Grid container spacing={5}>{
            productList.filter((p) => p.name.includes(filter)).map((p, i) => {return <Item key={'Item' + i} itemInfo={p} />})
            }</Grid>
        return items;
    }

    return (
        <Container>
            <Typography variant="h1">
                Products
            </Typography>
            <TextField sx={{margin: '10px 0px'}} id="outlined-filter" label="Filter By Name" onChange={(e) => setFilter(e.target.value)}/>
            {productList ? createItems() : null}
        </Container>
    )
}