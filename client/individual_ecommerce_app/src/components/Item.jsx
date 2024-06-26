import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { addToCart, removeFromCart } from "../API";
import { useContext } from "react";
import StateContext from "./StateContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Item({ itemInfo }) {
    const { auth, cart, setCart } = useContext(StateContext);
    async function handleClick(e) {
        e.preventDefault();
        if (itemInfo.buyable) {
            const result = await addToCart(auth.id, itemInfo.id, 1);
            setCart([...cart, result]);
        } else {
            removeFromCart(auth.id, itemInfo.product_id);
            setCart(cart.filter((i) => i.id != itemInfo.id))
        }
    }
    return (
        <Grid item xs={4}>
            <Card style={{width:'max-content'}}>
                <CardContent sx={{}}>
                    {itemInfo.name ? <Typography variant="h6">
                        Product name:
                    </Typography> : null}
                    {itemInfo.name ? <Typography variant="body1">
                        {itemInfo.name}
                    </Typography> : null}
                    {itemInfo.id ? <Typography variant="h6">
                        Product id:
                    </Typography> : null}
                    {itemInfo.id ? <Typography variant="body1">
                        {itemInfo.id}
                    </Typography> : null}
                    {itemInfo.category_name ? <Typography variant="h6">
                        Product category: 
                    </Typography> : null}
                    {itemInfo.category_name ? <Typography variant="body1">
                        {itemInfo.category_name}
                    </Typography> : null}
                    {itemInfo.price ? <Typography variant="h6">
                        Product price: 
                    </Typography> : null}
                    {itemInfo.price ? <Typography variant="body1">
                        ${itemInfo.price}
                    </Typography> : null}
                    {itemInfo.count ? <Typography variant="h6">
                        Amount in cart: 
                    </Typography> : null}
                    {itemInfo.count ? <Typography variant="body1">
                        {itemInfo.count}
                    </Typography> : null}
                </CardContent>
                <CardActions>
                    {itemInfo.buyable ?
                    <Button endIcon={<AddIcon />} onClick={handleClick} >Add to cart</Button> :
                    <Button endIcon={<RemoveIcon />} onClick={handleClick} >Remove from cart</Button>}
                </CardActions>
            </Card>
        </Grid>
    )
}