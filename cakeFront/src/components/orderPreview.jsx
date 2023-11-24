import { useState } from 'react'
import {Link,} from 'react-router-dom'

import { userAction, fetchOrders } from '../store'



function OrderPreview(props) {

    const [status, setStatus] = useState('Waiting for customer')

    const isAdmin = userAction((state) => state.isAdmin)
    const updateOrderStatus = fetchOrders((state) => state.updateOrderStatus)

    return (
        <>
            
                <div className="orderPreview-wrapper">
                <Link to={'' + props.id}>
                    <div className="order-data">
                        <div className="id-of-order-wrapper  info-item">
                            Id of order: {props.id}
                        </div>
                    </div>
                </Link>
                    <div className="status-of-order">status: <strong>{props.status}</strong></div>
                    <div className="status-block">
                            {isAdmin && 
                            <>
                            <select name="" id="" onChange={(e) => (setStatus(e.target.value))}>
                                <option value="Waiting for customer">Status: Waiting for customer</option>
                                <option value="Workin` at order">Status: working at order</option>
                                <option value="Decliened">Status: Decliened</option>
                            </select>
                            <button className='update-btn' onClick={() => (updateOrderStatus(props.id, status))}>Update</button>
                            </>}

                    </div>
                </div>
        </>
    )
}

export default OrderPreview