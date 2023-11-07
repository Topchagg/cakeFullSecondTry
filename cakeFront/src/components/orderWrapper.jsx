import { useParams } from "react-router-dom"
import { useEffect } from "react"

import ItemInOrderList from "./itemInOrderList"

import { fetchOrders } from "../store"


import '../styles/orderWrapper.css'

function OrderWrapper(props) {

    const {id} = useParams()

    const fetchNeededOrders = fetchOrders((state) => state.fetchNeededOrders)

    const items = fetchOrders((state) => state.items)
    const user = fetchOrders((state) => state.user)
    const workStatus = fetchOrders((state) => state.workStatus)
    const totalPrice = fetchOrders((state) => state.totalPrice)
    const amountOfItems = fetchOrders((state) => state.amountOfItems)

    useEffect(() => {
        fetchNeededOrders(id, false)
    },[])

    return (
        <>
            <div className="wrapper-of-order">
               <div className="info-about-order">
                <div className="user-data-wrapper">
                    <div>
                        <h1>User data</h1>
                    </div>
                    <div className="data-wrapper">
                        <p>User id:  <strong>{user['pk']}</strong></p>
                        <p>Phone number: <strong>{user['phoneNumber']}</strong></p>
                        <p>First name: <strong>{user['first_name']}</strong></p>
                        <p>Last name: <strong>{user['last_name']}</strong></p>
                        <p>Email: <strong>{user['email']}</strong></p>
                    </div>
                </div>
                    <div className="order-status-wrapper small-wrapper">
                        Order status: <strong>{workStatus}</strong>
                    </div>
                    <div className="when-ordered-wrapper small-wrapper">
                        When ordered: <strong>03.10.2023, 20:31</strong>
                    </div>
                    <div className="general-information-wrapper">
                        <h2>General Information</h2>
                        <p>Total price: <strong>{totalPrice}$</strong></p>
                        <p>Amount of items: <strong>{amountOfItems}</strong></p>
                    </div>
                </div>
                <div className="items-wrapper-info">
                    {items.map((item) => (
                        <ItemInOrderList img={item['imgOfItem']} nameOfItem={item['nameOfItem']} amount={item['Amount']} priceOfItem={item['priceOfItem']} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default OrderWrapper