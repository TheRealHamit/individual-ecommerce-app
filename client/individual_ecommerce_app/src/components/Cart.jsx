import { useEffect, useState } from "react"
import { getCart } from "../API";

export default function Cart() {

    const [cart, setCart] = useState(null);

    useEffect(() => {
        async function fetchCart() {
            setCart(await getCart());
        }
        fetchCart();
    }, [])

    return (
        <div>
            <h1>Cart:</h1>
            {cart ? cart.map((i) =>
            <div>
                <p>{i.product_id}</p>
                <p>{i.count}</p>
            </div>
            ) : <p>F</p>}
        </div>
    )
}