import {userAction} from '../store'

import OrderWrapperPreview from "../sections/orderWrapperPreview"

import '/src/styles/orderPreview.css'
import '/src/styles/orderWrapper.css'
import '/src/styles/adminOrdersPage.css'


function OrderPage () {

    const isAdmin = userAction((state) => state.isAdmin)

    return (
        <>
            {isAdmin && <OrderWrapperPreview/>}
            {isAdmin || <h1 className='raise-error'>U don`t have acsess</h1>}
        </>
            
        
    )

}

export default OrderPage