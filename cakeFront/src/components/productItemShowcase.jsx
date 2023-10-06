import { useEffect, useState } from 'react'


import BestsellerLine from './bestsellerLine'
import AddButton from "./addButton"

import { cart } from '../store'

import '../styles/ProductItemShowcase.css'

function ProductItem (props) {

    const [infoBestseller, setInfoBestseller] = useState(false)

    const addItemIntoCart = cart((state) => state.addItemIntoCart)
    const items = cart((state) => state.items)

    function handleOnMouseUp() {
        setInfoBestseller(!infoBestseller)
    }
   

    

    function handleOnMouseDown() {
        setInfoBestseller(!infoBestseller)
    }

    return (
        <div className="product-item-wrapper">
            <div className="product-img-wrapper">
                <div className="star-wrapper">{props.bestseller && <img  onMouseEnter={handleOnMouseUp} onMouseLeave={handleOnMouseDown} className='star' src="yellow-star.png" alt=""/>}{infoBestseller && <BestsellerLine/>}</div>
                <img src="Rectangle 8.png" alt="" />
            </div>
            <div className="product-data-wrapper">
                <div className="name-of-product-wrapper">
                    <div className="name-of-product">
                        {props.name}
                    </div>
                </div>
                <div className="add-button-n-price-wrapper">
                    <div className="price-of-item">
                        {props.price} $ 
                    </div>
                    <div className="add-btn">
                       <AddButton fullItem={props.fullItem} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem