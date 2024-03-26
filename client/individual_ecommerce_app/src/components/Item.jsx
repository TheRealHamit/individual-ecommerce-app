import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { addToCart } from "../API";

export default function Item({ itemInfo }) {

    async function handleClick(e) {
        e.preventDefault();
        addToCart(itemInfo.id, 1);
    }
    return (
        <Grid item xs={4}>
            <Card>
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
                    {itemInfo.buyable ? <Button onClick={handleClick} >Add to cart</Button> : null}
                </CardActions>
            </Card>
        </Grid>
    )
}