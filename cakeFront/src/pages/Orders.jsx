import { useEffect } from "react"

import OrderPreview from "../components/orderPreview"

import { fetchOrders } from "../store"


function OrderPage () {

    const fetchNeededOrders = fetchOrders((state) => state.fetchNeededOrders)
    const orders = fetchOrders((state) => state.orders)
    const user = fetchOrders((state) => state.user)

    function something () {
        console.log(user)
    }

    useEffect(() => {
        fetchNeededOrders()
    }, [])

    return (
        <>
            <button value="button" onClick={() => something()}> Something </button>
            <h1 className="tittle">Orders</h1>
            {orders.map((order) => (
               <OrderPreview id={order['pk']} userPhoneNumber={user['userPhoneNumber']} userName={user['userName']} userEmail={user['userEmail']}  />
            ))}
        </>
    )

}

export default OrderPage