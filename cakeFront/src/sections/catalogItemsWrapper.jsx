import { useEffect, useState } from 'react'


import {productItemFetch, tools} from '../store'
import '../styles/catalogItemsWrapper.css'
import ProductItem from '../components/productItemShowcase'


function itemsWrapper () {

    const incrementPage = tools((state) => state.incrementPage)
    const decrimentPage = tools((state) => state.decrimentPage)
    const fixWrongPage = tools((state) => state.fixWrongPage)

    const findBiggestPrice = productItemFetch((state) => state.findBiggestPrice)
    const biggestPrice = productItemFetch((state) => state.biggestPrice)
    const fetchNeededItems = productItemFetch((state) => state.fetchNeededItems)
    const neededItems = productItemFetch((state) => state.neededItems)
    const loaded = productItemFetch((state) => state.loaded)
    const status = productItemFetch((state) => state.status)

    const [lowHighFilter, setLowHighFilter] = useState('none')
    const [bestsellerFilter, setBestsellerFilter] = useState(false)
    const [page, setPage] = useState(1)
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
            
            fetchNeededItems(bestsellerFilter, minPrice, maxPrice, page, lowHighFilter);
        }, 200);

        return () => clearTimeout(timer);
    }, [minPrice, maxPrice, bestsellerFilter,lowHighFilter]);

    useEffect(() => {
        console.log(lowHighFilter)
        fetchNeededItems(bestsellerFilter, minPrice, maxPrice, page, lowHighFilter )
    }, [page])

    useEffect(() => {
        fixWrongPage(page, setPage)
     },[status])

   return (
    <>
            {loaded && 
            <div className="catalog-filter-section">
            <input type='range' max={biggestPrice} min={0} onChange={changeMinPrice} ></input> <label htmlFor="">Min price: {minPrice}</label>
            <input type='range' max={biggestPrice} defaultValue={biggestPrice} min={0} onChange={changeMaxPrice} ></input> <label htmlFor="">Max price: {maxPrice}</label>
            <input type="checkbox" onClick={() => {setBestsellerFilter(!bestsellerFilter)}}  />
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
                <ProductItem img={item.imgOfItem} bestseller={item.BestsellerItem} price={item.priceOfItem} name={item.nameOfItem} slug={item.slug} />
            ))}
        </div>}
        {loaded &&
         <div className="carousel-btn-wrapper">
         <div className="carousel-wrapper">
                  <button type='button' onClick={() => decrimentPage(page, setPage)} className="decriment-btn carousel-btn">
                      &laquo;	
                  </button>
                  <>{page}</>
                  <button type='button' onClick={() => incrementPage(page, setPage)}  className="increment-btn carousel-btn">
                      &raquo;
                  </button>
              </div> 
          </div>
          }

       
    </>
   )
}

export default itemsWrapper



