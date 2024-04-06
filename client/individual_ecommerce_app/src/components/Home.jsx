import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import StateContext from "./StateContext";
import FeaturedList from "./FeaturedList";

export default function Home() {
    const { productList } = useContext(StateContext);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        function getFeatured() {
            const random = productList.sort(() => .5 - Math.random()).slice(0,5);
            setFeatured(random);
        }
        getFeatured();
    }, [productList])

    return (
        <Box>
            <Typography variant="h1">
                Home
            </Typography>
            {featured ? <FeaturedList featuredItems={featured} /> : null}
        </Box>
    )
}