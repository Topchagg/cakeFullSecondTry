import { useEffect, useState } from 'react'


import {productItemFetch, forShowCaseFetch} from '../store'
import '../styles/catalogItemWrapper.css'
import ProductItem from '../components/productItemShowcase'


function ItemsWrapper () {


    const fetchNeededItems =  productItemFetch((state) => state.fetchNeededItems)
    const neededItems = productItemFetch((state) => state.neededItems)
    const page = productItemFetch(state => (state.page))

    const incrementPage = productItemFetch(state => (state.incrementPage))
    const decrimentPage = productItemFetch(state => (state.decrimentPage))


    function increment() {
        incrementPage(page)
    }

    function decriment() {
        decrimentPage(page)
    }

    useEffect(() => {
        fetchNeededItems('','','', page)
    },[page])

    return (
        <div className="items-wrapper">
            {neededItems.map((item) => (
                <ProductItem  name={item.nameOfItem} price={item.priceOfItem} bestseller={item.BestsellerItem} />
            ))}
            <div className="carousel-btn-wrapper">
                <div className="carousel-wrapper">
                    <button type='button' onClick={decriment} className="decriment-btn carousel-btn">
                        &laquo;	
                    </button>
                    <button type='button' onClick={increment} className="increment-btn carousel-btn">
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemsWrapper