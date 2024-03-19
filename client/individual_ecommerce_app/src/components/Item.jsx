import { addToCart } from "../API";

export default function Item({ itemInfo }) {

    async function handleClick(e) {
        e.preventDefault();
        addToCart(itemInfo.id, 1);
    }
    return (
        <div>
            <h2>Item Name: {itemInfo.name}</h2>
            <h3>Item Id: {itemInfo.id}</h3>
            <h2>Item Category: {itemInfo.category_name}</h2>
            <h2>Item Price: ${itemInfo.price}</h2>
            <input type="button" value="Add to cart" onClick={handleClick}></input>
        </div>
    )
}