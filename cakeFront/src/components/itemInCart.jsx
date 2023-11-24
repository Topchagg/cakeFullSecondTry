import { useEffect, useState } from "react"
import { cart } from "../store"

import AddButton from "./addButton"
import DeleteButton from "./deleteButton"






function ItemInCart(props) {

    const [amount, setAmount] = useState(props.amount)

    const addItemIntoCart = cart((state) => state.addItemIntoCart)
    const changeAmountOfItem = cart((state) => state.changeAmountOfItem)
    const setLocalItemsData = cart((state) => state.setLocalItemsData)
    const restrictions = cart((state) => state.restrictions)
    const totalPrice = cart((state) => state.totalPrice)
    
    

    useEffect(() => {
        changeAmountOfItem(props.name, amount, "change")
        const parsedLocalData = JSON.parse(localStorage.getItem("bigItems"))
        setLocalItemsData(parsedLocalData)
        console.log(parsedLocalData)
    }, [amount])

    return (
        <>
            <div className="item-wrapper">
                <div className="">
                    <img className="item-img-wrapper-cart" src={props.img} alt="" />
                </div>      
                <div className="name-wrapper">
                    <p>Name: <strong>{props.name}</strong></p>
                    <p>Amount: <strong>{props.amount}</strong></p>
                    <p>Price for a unite: <strong>{props.price}$</strong></p>
                </div>
            </div>
            <div className="change-amount-wrapper">
            <button className="decriment-btn" onClick={() => {changeAmountOfItem(props.name, amount, "decriment"),setAmount(parseInt(props.amount - 1))}}>Decriment</button>
            <div className="wrapper"><input className="change-amount" id="change-amount" type="number" min={0}    onChange={(e) => (setAmount(parseInt(e.target.value)))}/></div>
            <AddButton fullItem={props.fullItem} func={addItemIntoCart}/>
            </div>
            <DeleteButton name={props.name} func={changeAmountOfItem}/>
        </>
    )    
}

export default ItemInCart