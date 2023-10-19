
import { useEffect } from 'react'
import { cart } from '../store'

import '../styles/deleteButton.css'

function DeleteButton (props) {

    const deleteItemInCart = cart((state) => state.deleteItemInCart)


    return (
        <button className='deleteButton' onClick={() => (deleteItemInCart(props.name))}>Delete</button>
    )
}

export default DeleteButton