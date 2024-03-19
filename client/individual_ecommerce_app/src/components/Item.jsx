export default function Item({ itemInfo }) {
    return (
        <div>
            <h2>Item Name: {itemInfo.name}</h2>
            <h2>Item Category: {itemInfo.category_id}</h2>
            <h2>Item Price: {itemInfo.price}</h2>
        </div>
    )
}