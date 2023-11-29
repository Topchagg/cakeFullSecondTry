import { useEffect, useState } from 'react'

import Carousel from '../components/carouselBlock'

import {productItemFetch, userAction} from '../store'
import ProductItem from '../components/productItemShowcase'
import { useParams } from 'react-router-dom'




function itemsWrapper () {
    
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [bestseller, setBestseller] = useState('')
    const [image, setImage] = useState('')
    
    function imageHandler(e) {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }


    const {category} = useParams();
    const [isCreating, setIsCreating] = useState(false)
  

    const findBiggestPrice = productItemFetch((state) => state.findBiggestPrice)
    const biggestPrice = productItemFetch((state) => state.biggestPrice)
    const fetchNeededItems = productItemFetch((state) => state.fetchNeededItems)
    const neededItems = productItemFetch((state) => state.neededItems)
    const loaded = productItemFetch((state) => state.loaded)
    const status = productItemFetch((state) => state.status)
    const createObject = userAction((state) => state.createObject)

    const [page, setPage] = useState(1)
    const [lowHighFilter, setLowHighFilter] = useState('none')
    const [bestsellerFilter, setBestsellerFilter] = useState(false)
    const [maxPrice, setMaxPrice] = useState(biggestPrice)
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
            {isCreating || 
            <>
            {loaded && 
                <div className="catalog-filter-section">
              <div className="filters">
              <div className="sliders-wrapper">
               <div className="slider-wrapper"><label htmlFor="">Min price: {minPrice}</label><input className='slider' type='range' max={biggestPrice} min={0} onChange={changeMinPrice} ></input></div>
                <div className="slider-wrapper"><label htmlFor="">Max price: {maxPrice}</label><input className='slider' type='range' max={biggestPrice} defaultValue={biggestPrice} min={0} onChange={changeMaxPrice} ></input></div>
               </div>
               <div className="bestseller-choice-wrapper">
                Bestseller <input className='bestseller-checkbox'  type="checkbox" onClick={() => {setBestsellerFilter(!bestsellerFilter)}}/>
               </div>
                <div className="select-wrapper">
                    <select className='low-high-filter' name='low-high-filter' onChange={(e) => {setLowHighFilter(e.target.value)}}>
                        <option className='option-item' value="none">None</option>
                        <option className='option-item' value="lowToHigh">Low to high</option>
                        <option className='option-item' value="highToLow">High to low</option>
                    </select>
                </div>
                {/* <button className='update-btn' onClick={() => (setIsCreating(!isCreating))} >Create new item</button> */}
              </div>
              <button className="create-item-button" onClick={() => (setIsCreating(!isCreating))}>Create new item</button>
                </div>}
           {loaded && 
                <div className="items-wrapper">
                {neededItems.map((item) => (
                    <ProductItem slug={item.slug} key={item.pk} id={item.pk} bestseller={item.BestsellerItem} img={item.imgOfItem} price={item.priceOfItem} name={item.nameOfItem} fullItem={item} description={item.descriptionOfItem} category={item.categoryOfItem} />
                ))}
            </div>}
        {loaded &&
            <div className="carousel-wrapper"><Carousel page={page} setPage={setPage} status={status} /></div>
          }
            </>}

        {isCreating && 
        <div className='create-product' >
            <div className="creating-form-wrapper">
                <button className='delete-btn' onClick={() => (setIsCreating(!setIsCreating))}>Decline</button>
                <button className='update-btn' onClick={() => (createObject('product',name,image,price,bestseller,'da',category))} >Create</button>
                <div className="form-wrapper">
                    <form action="">
                        <div className="input-wrapper">
                            Name: <input className='input-form' placeholder='Write here' type="text" onChange={(e) => (setName(e.target.value))} />
                        </div>
                        <div className="input-wrapper">
                            Price: <input className='input-form'  type="number" onChange={(e) => (setPrice(e.target.value))} />
                        </div>
                        <div className="input-wrapper">
                            Bestseller: <input className='input-form'  type="checkbox" onChange={(e) => (setBestseller(e.target.value))} />
                        </div>
                        <div className="input-wrapper">
                            Image: <input className='input-form'  type="file" onChange={imageHandler} />
                        </div>
                        <div className="input-wrapper">
                            Category: {category}
                        </div>
                    </form>
                </div>
            </div>
        </div>}

       
    </>
   )
}

export default itemsWrapper



