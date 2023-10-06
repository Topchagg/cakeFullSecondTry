import {Link,} from 'react-router-dom'

import '../styles/OrderPreview.css'

function OrderPreview(props) {
    return (
        <>
            <Link to={'' + props.id}>
                <div className="orderPreview-wrapper">
                    <div className="user-data-wrapper">
                        <div className="user-phone-number info-item">
                            Phone Number: {props.userPhoneNumber}
                        </div>
                        <div className='user-name info-item'>
                            Name: {props.userName}
                        </div>
                        <div className="user-emai info-item">
                            Email: {props.userEmail}
                        </div>
                    </div>
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