import { useContext, useEffect, useState } from "react"
import { getProducts } from "../API";
import Item from "./Item";
import { Box, Container, Grid, Typography, TextField } from "@mui/material";
import StateContext from "./StateContext";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function Products() {
    const ref = useRef();
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    });

    const { productList } = useContext(StateContext);
    const [filter, setFilter] = useState("");

    
    function createItems() {
        const items = productList
        .filter((p) => p.name.includes(filter) || p.category_name.includes(filter))
        .map((p, i) => {return <Item key={'Item' + i} itemInfo={p} />})
            
        return items;
    }

    return (
        <Box sx={{ 
            display: "flex",
            flexDirection: "column",
            minHeight: 0
             }}>
            <Typography variant="h1">
                Products
            </Typography>
            <TextField sx={{margin: '10px 0px'}} id="outlined-filter" label="Filter By Name" onChange={(e) => setFilter(e.target.value)}/>
            <Box ref={ref} {...events} sx={{ flexGrow: 1, overflow: "auto" }} >
                <Grid container spacing={5} >
                    {productList ? createItems() : null}
                </Grid>
            </Box>
        </Box>
    )
}