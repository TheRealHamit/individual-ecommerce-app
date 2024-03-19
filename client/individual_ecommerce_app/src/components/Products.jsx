import { useEffect, useState } from "react"
import { getProducts } from "../API";
import Item from "./Item";

export default function Products() {
    const [products, setProducts] = useState();

    useEffect(() => {
        async function fetchProducts() {
            const p = await getProducts();
            await setProducts(p);
        }
        fetchProducts();
    }, [])
    return (
        <div>
            <h1>Products</h1>
            <div>{products ? products.map((p, i) => {return <Item key={'Item' + i} itemInfo={p} />}) : null}</div>
        </div>
    )
}