import { useState } from 'react'
import '../styles/ProductItemShowcase.css'

import BestsellerLine from './bestsellerLine'

function ProductItem (props) {

    const [infoBestseller, setInfoBestseller] = useState(false)


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
                <img className='product-item-img' src={props.img} alt="" />
            </div>
            <div className="product-data-wrapper">
                <div className="name-of-product-wrapper">
                    <div className="name-of-product">
                        Something yes
                    </div>
                </div>
                <div className="add-button-n-price-wrapper">
                    <div className="price-of-item">
                        123$
                    </div>
                    <div className="add-btn">
                        <button className='add-button' type='button'><img className='add-button-pic' src="Vector (2).png" alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem