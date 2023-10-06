
import '../styles/ItemInOrderList.css'

function ItemInOrderList(props) {
    return (
        <div className="item-order-list-wrapper">
            <div className="order-img-wrapper">

            </div>
            <div className="amount-price-wrapper">
                <p>Name: <strong>{props.nameOfItem}</strong> </p>
                Amount: <strong>{props.amount}</strong>
                <div className="">
                Price for per: <strong>{props.priceOfItem}$</strong>
                </div>
            </div>
        </div>
    )
}

export default ItemInOrderList