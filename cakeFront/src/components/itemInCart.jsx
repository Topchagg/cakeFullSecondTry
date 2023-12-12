import { useEffect, useState } from "react"
import { cart } from "../store"

import AddButton from "./addButton"
import DeleteButton from "./deleteButton"






function ItemInCart(props) {

    const [amount, setAmount] = useState(props.amount)

    const addItemIntoCart = cart((state) => state.addItemIntoCart)
    const changeAmountOfItem = cart((state) => state.changeAmountOfItem)
    const setLocalItemsData = cart((state) => state.setLocalItemsData)
    const deleteItemInCart = cart((state) => state.deleteItemInCart)
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
            <div className="info-wrapper">
                <div className="delete-cross-wrapper" onClick={() => (deleteItemInCart(props.name))}> <img className="delete-cross" src="/remove.png" alt="" /> </div>
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
                <button className="add-button" onClick={() => {changeAmountOfItem(props.name, amount, "decriment"),setAmount(parseInt(props.amount - 1))}}> <img className="minus" src="https://firebasestorage.googleapis.com/v0/b/cake-shop-2c6c5.appspot.com/o/imagesFproject%2Fminus.png?alt=media&token=25bce2a3-d698-4097-b573-eb8f68ae4393" alt="" /> </button>
                <div className="wrapper"><input className="change-amount" value={props.amount} id="change-amount" type="number" min={0}    onChange={(e) => (setAmount(parseInt(e.target.value)))}/>
            </div>
            <AddButton fullItem={props.fullItem} func={addItemIntoCart}/>
            </div>
            </div>
        </>
    )    
}

export default ItemInCart