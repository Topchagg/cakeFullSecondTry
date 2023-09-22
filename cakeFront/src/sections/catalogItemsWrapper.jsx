import { useEffect, useState } from 'react'


import {productItemFetch, forShowCaseFetch} from '../store'
import '../styles/catalogItemsWrapper.css'
import ProductItem from '../components/productItemShowcase'


function itemsWrapper () {

    const findBiggestPrice = productItemFetch((state) => state.findBiggestPrice)
    const biggestPrice = productItemFetch((state) => state.biggestPrice)
    const fetchNeededItems = productItemFetch((state) => state.fetchNeededItems)
    const neededItems = productItemFetch((state) => state.neededItems)

    const loaded = productItemFetch((state) => state.loaded)

    const [bestsellerFilter, setBestsellerFilter] = useState(false)
    const [maxPrice, setMaxPrice] = useState(500)
    const [minPrice, setMinPrice] = useState(0)

    function changeMaxPrice(e) {
        setMaxPrice(e.target.value);

        
    }

    function changeMinPrice(e) {
        setMinPrice(e.target.value)
    }

    useEffect( () => {
        findBiggestPrice()
    }, [])

    useEffect(()=> {
        setMaxPrice(biggestPrice)
    },[biggestPrice])

    useEffect(() => {
      
        const timer = setTimeout(() => {
            
            fetchNeededItems(bestsellerFilter, minPrice, maxPrice);
        }, 300);

        return () => clearTimeout(timer);
    }, [minPrice, maxPrice, bestsellerFilter]);

   return (
    <>
            {loaded && 
            <div className="catalog-filter-section">
            <input type='range' max={biggestPrice} min={0} onChange={changeMinPrice} ></input> <label htmlFor="">Min price: {minPrice}</label>
            <input type='range' max={biggestPrice} defaultValue={biggestPrice} min={0} onChange={changeMaxPrice} ></input> <label htmlFor="">Max price: {maxPrice}</label>
            <input type="checkbox" onClick={() => {setBestsellerFilter(!bestsellerFilter)}}  />
            </div>  }
           {loaded && 
            <div className="items-wrapper">
            {neededItems.map((item) => (
                <ProductItem img={item.imgOfItem} bestseller={item.BestsellerItem} price={item.priceOfItem} name={item.nameOfItem} slug={item.slug} />
            ))}
           
        </div>}
    </>
   )
}

export default itemsWrapper



