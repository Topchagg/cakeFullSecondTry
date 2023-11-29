
import '/src/styles/itemPage.css'

import { productItemFetch,cart } from '../store'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function ItemPage() {

   const fetchNeededItem = productItemFetch((state) => state.fetchNeededItem)
   const neededItem = productItemFetch((state) => state.neededItem)
   const addItemIntoCart = cart((state) => state.addItemIntoCart)
   const {item} = useParams()

   useEffect(() => {
    fetchNeededItem(item)
   },[])

    return (
        <div className="item-page">
            <div className="item-img-wrapper">
                <img className='item-img' src={neededItem.imgOfItem} alt="" />
            </div>
            <div className="line-wrapper">
                <img src="/line.png" alt="" />
            </div>
            <div className="info-items">
                        <div className="info-of-item">
                            <span className='name-of-item'>{neededItem.nameOfItem}</span>
                        </div>
                        <div className="info-of-item">
                            {neededItem.priceOfItem}$
                        </div>
                        <div className="info-of-item">
                            Bestseller: {neededItem.BestsellerItem && <>Yes</> || <>No</> } 
                        </div>
                        <div className="add-btn-wrapper">
                            <button className='item-add-btn' onClick={() => (addItemIntoCart(neededItem))} type='button'>ADD TO CART</button>
                        </div>
                    </div>
            <div className="item-description">
               {neededItem.descriptionOfItem}
            </div>
        </div>
    )
}

export default ItemPage