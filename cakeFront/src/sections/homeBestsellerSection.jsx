import '../styles/homeBestsellerSection.css'
import ProductItem from '../components/productItemShowcase'
import LinkButton from '../components/linkButton'

import { forShowCaseFetch, tools } from '../store'
import { useEffect, useState } from 'react'





function HomeBestsellerSection () {


    const [page, setPage] = useState(1)

    const incrementPage = tools(state => (state.incrementPage))
    const decrimentPage = tools(state => (state.decrimentPage))
    const fixWrongPage = tools(state => (state.fixWrongPage))

    const bestsellers = forShowCaseFetch(state => (state.bestsellers))
    const status = forShowCaseFetch(state => (state.status)) 
    const fetchBestsellersForShowcase = forShowCaseFetch(state => (state.fetchBestsellersForShowcase))

    useEffect(() => {
        fetchBestsellersForShowcase(page, 'false')
     },[page])

     useEffect(() => {
        fixWrongPage(page, setPage)
     },[status])

    return (
        <div className="home-bestseller-section">
            <div className="large-text">BESTSELLERS</div> 
            <div className="bestsellers-items-wrapper">
            {bestsellers.map((item) => (
                <ProductItem bestseller={item.BestsellerItem} img={item.imgOfItem} price={item.priceOfItem} name={item.nameOfItem}/>
                      
        ))}
            </div>
            <div className="carousel-btn-wrapper">
                <div className="carousel-wrapper">
                    <button type='button' onClick={() => {decrimentPage(page, setPage)}} className="decriment-btn carousel-btn">
                        &laquo;	
                    </button>
                    <button type='button' onClick={() => {incrementPage(page, setPage)}} className="increment-btn carousel-btn">
                        &raquo;
                    </button>
                </div>
                <div className="button-wrapper">
                    <LinkButton link={'/Catalog'} text={'Catalog'}  />
                </div>
            </div>
        </div>
    )
}

export default HomeBestsellerSection