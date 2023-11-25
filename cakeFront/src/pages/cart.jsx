import { cart,fetchOrders } from "../store"

import ItemInCart from "../components/itemInCart"

import '/src/styles/cart.css'
import '/src/styles/itemInCart.css'
import '/src/styles/itemInOrderList.css'


function Cart () {

    const toggleShowCart = cart((state) => state.toggleShowCart)
    const Amount = cart((state) => state.Amount)
    const totalPrice = cart((state) => state.totalPrice)
    const restrictions = cart((state) => state.restrictions)
    const items = cart((state) => state.items)

    const createNewOrder = fetchOrders((state) => state.createNewOrder)
    const raiseError = fetchOrders((state) => state.raiseError)
    const isCreate = fetchOrders((state) => state.isCreate)

    return (
        <>
            <div className="cart-wrapper" onClick={() => {toggleShowCart()}}>
                <div className="cart" onClick={(e) => (e.stopPropagation())} >
                    {raiseError && <h1>Something went wrong, please order later!</h1>}
                    {isCreate && <h1>U ordered! Thank you, we call you later!</h1>}
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
                        <button className="button-buy" onClick={() => (createNewOrder(items))}>
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