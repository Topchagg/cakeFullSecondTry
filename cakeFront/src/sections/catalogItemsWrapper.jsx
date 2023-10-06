import { useEffect, useState } from 'react'

import Carousel from '../components/carouselBlock'

import {productItemFetch, tools} from '../store'
import ProductItem from '../components/productItemShowcase'
import { useParams } from 'react-router-dom'

import '../styles/catalogItemsWrapper.css'


function itemsWrapper () {

    const {category} = useParams();


    

    const findBiggestPrice = productItemFetch((state) => state.findBiggestPrice)
    const biggestPrice = productItemFetch((state) => state.biggestPrice)
    const fetchNeededItems = productItemFetch((state) => state.fetchNeededItems)
    const neededItems = productItemFetch((state) => state.neededItems)
    const loaded = productItemFetch((state) => state.loaded)
    const status = productItemFetch((state) => state.status)

    const [page, setPage] = useState(1)
    const [lowHighFilter, setLowHighFilter] = useState('none')
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
        findBiggestPrice(category)
    }, [])

    useEffect(()=> {
        setMaxPrice(biggestPrice)
    },[biggestPrice])

    useEffect(() => {
      
        const timer = setTimeout(() => {
            
            fetchNeededItems(bestsellerFilter, minPrice, maxPrice, page, lowHighFilter, category);
        }, 200);

        return () => clearTimeout(timer);
    }, [minPrice, maxPrice, bestsellerFilter,lowHighFilter]);

    useEffect(() => {
        fetchNeededItems(bestsellerFilter, minPrice, maxPrice, page, lowHighFilter,category )
    }, [page])



   return (
    <>
            {loaded && 
            <div className="catalog-filter-section">
            <input type='range' max={biggestPrice} min={0} onChange={changeMinPrice} ></input> <label htmlFor="">Min price: {minPrice}</label>
            <input type='range' max={biggestPrice} defaultValue={biggestPrice} min={0} onChange={changeMaxPrice} ></input> <label htmlFor="">Max price: {maxPrice}</label>
            <input type="checkbox" onClick={() => {setBestsellerFilter(!bestsellerFilter)}}  /> <label htmlFor="">Bestseller only</label>
            <select name='low-high-filter' onChange={(e) => {setLowHighFilter(e.target.value)}}>
                <option value="none">None</option>
                <option value="lowToHigh">Low to high</option>
                <option value="highToLow">High to low</option>
            </select>
            <label htmlFor="">Start with</label>
            </div>  }
           {loaded && 
            <div className="items-wrapper">
            {neededItems.map((item) => (
                <ProductItem img={item.imgOfItem} bestseller={item.BestsellerItem} price={item.priceOfItem} name={item.nameOfItem} slug={item.slug} fullItem={item} />
            ))}
        </div>}
        {loaded &&
            <Carousel page={page} setPage={setPage} status={status} />
          }

       
    </>
   )
}

export default itemsWrapper



