import {Link,} from 'react-router-dom'

import '../styles/OrderPreview.css'

function OrderPreview(props) {
    return (
        <>
            <Link to={'' + props.id}>
                <div className="orderPreview-wrapper">
                    <div className="order-data">
                        <div className="id-of-order-wrapper  info-item">
                            Id of order: {props.id}
                        </div>
                    </div>
                    <div className="status-block">
                            Status: working at order
                    </div>
                </div>
            </Link>
        </>
    )
}

export default OrderPreview