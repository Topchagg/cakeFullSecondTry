
import AddButton from "./addButton"

import '../styles/itemInCart.css'

function ItemInCart(props) {
    return (
        <>
            <div className="item-wrapper">
                <div className="">
                    <img className="item-img-wrapper-cart" src={props.img} alt="" />
                </div>
                <div className="name-wrapper">
                    <p>Name: <strong>{props.name}</strong></p>
                    <p>Amount: <strong>{props.amount}</strong></p>
                </div>
            </div>
            <AddButton fullItem={props.fullItem} />
        </>
    )    
}

export default ItemInCart