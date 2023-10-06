import { useEffect } from "react"

import { cart,fetchOrders } from "../store"

import ItemInCart from "../components/itemInCart"


import '../styles/cart.css'


function Cart () {

    const setShowCart = cart((state) => state.setShowCart)
    const Amount = cart((state) => state.Amount)
    const totalPrice = cart((state) => state.totalPrice)
    const items = cart((state) => state.items)

    const createNewOrder = fetchOrders((state) => state.createNewOrder)

    return (
        <>
            <div className="cart-wrapper" onClick={() => (setShowCart())}>
                <div className="cart" onClick={(e) => (e.stopPropagation())} >
                    <div className="cart-tittle-wrapper">
                        <h1 className="cart-tittle" >Cart</h1>
                    </div>
                    <div className="cart-items-wrapper">
                        {items.map((item) => (
                            <ItemInCart  img={item.imgOfItem} name={item.nameOfItem} fullItem={item} amount={item.Amount} />
                        ))}
                    </div>
                    <div className="total-info-wrapper">
                        <button className="button-buy" onClick={() => (createNewOrder(items, "Pasha", "0963087222", "thrales@gmail.com", 2))}>
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