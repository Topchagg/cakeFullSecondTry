import { useEffect } from "react"

import OrderPreview from "../components/orderPreview"

import { fetchOrders } from "../store"



function OrderWrapperPreview() {

    const fetchNeededOrders = fetchOrders((state) => state.fetchNeededOrders)
    const orders = fetchOrders((state) => state.orders)



    useEffect(() => {
        fetchNeededOrders(undefined, true)
    }, [])

    return (
       <>
            <h1 className="tittle">Orders</h1>
            {orders.map((order) => (
               <OrderPreview  id={order['pk']} status={order.status} />
            ))}
       </>
    )
}

export default OrderWrapperPreview