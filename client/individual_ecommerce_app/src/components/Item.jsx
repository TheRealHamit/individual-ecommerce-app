export default function Item({ itemInfo }) {
    return (
        <div>
            <h2>{itemInfo.name}</h2>
            <h2>{itemInfo.price}</h2>
        </div>
    )
}