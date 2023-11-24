


function ItemInOrderList(props) {
    return (
        <div className="item-order-list-wrapper">
            <div className="order-img-wrapper">
                <img className='order-img' src={props.img} alt="" />
            </div>
            <div className="amount-price-wrapper">
                <p>Name: <strong>{props.nameOfItem}</strong> </p>
                Amount: <strong>{props.amount}</strong>
                <div className="">
                <p>Price for per: <strong>{props.priceOfItem}$</strong></p>
                total price  <strong>{props.amount * props.priceOfItem}$</strong>
                </div>
            </div>
        </div>
    )
}

export default ItemInOrderList