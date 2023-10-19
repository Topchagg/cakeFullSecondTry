import { cart,fetchOrders } from "../store"

import ItemInCart from "../components/itemInCart"

import '../styles/cart.css'


function Cart () {

    const toggleShowCart = cart((state) => state.toggleShowCart)
    const Amount = cart((state) => state.Amount)
    const totalPrice = cart((state) => state.totalPrice)
    const restrictions = cart((state) => state.restrictions)
    const items = cart((state) => state.items)

    const createNewOrder = fetchOrders((state) => state.createNewOrder)

    return (
        <>

            <div className="cart-wrapper" onClick={() => {toggleShowCart()}}>
                <div className="cart" onClick={(e) => (e.stopPropagation())} >
                    {restrictions && <><h2>Please enter real quantity of needed product. If u have a problem with order call for this number 887-549-00-15</h2></>}
                    <div className="cart-tittle-wrapper">
                        <h1 className="cart-tittle" >Cart</h1>
                    </div>
                    <div className="cart-items-wrapper">
                        {items.map((item) => (
                            <ItemInCart  img={item.imgOfItem} name={item.nameOfItem} fullItem={item} amount={item.Amount} price={item.priceOfItem}  />
                        ))}
                    </div>
                    <div className="total-info-wrapper">
                        <button className="button-buy" onClick={() => (createNewOrder(items, 10))}>
                            ORDER
                        </button>
                        <div className="total-price total">
                            Total price: {totalPrice}$
                        </div>
                        <div className="total-amount total">
                            Total amount: {Amount}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart