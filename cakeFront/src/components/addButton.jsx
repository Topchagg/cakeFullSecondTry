import { cart } from '../store'

import '../styles/ProductItemShowcase.css'

function AddButton(props) {

    
    const addItemIntoCart = cart((state) => state.addItemIntoCart)
    return (
        <button className='add-button' type='button'onClick={() => {addItemIntoCart(props.fullItem)}}  ><img className='add-button-pic' src="Vector(2).png" alt="" /></button>
    )
}

export default AddButton