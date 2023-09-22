import '../styles/homeBestsellerSection.css'
import ProductItem from '../components/productItemShowcase'
import LinkButton from '../components/linkButton'

import { forShowCaseFetch } from '../store'
import { useEffect } from 'react'





function HomeBestsellerSection () {

    const bestsellers = forShowCaseFetch(state => (state.bestsellers))
    const page = forShowCaseFetch(state => (state.page))
    const incrementPage = forShowCaseFetch(state => (state.incrementPage))
    const decrimentPage = forShowCaseFetch(state => (state.decrimentPage))
    const fetchBestsellersForShowcase = forShowCaseFetch(state => (state.fetchBestsellersForShowcase))

    useEffect(() => {
      fetchBestsellersForShowcase()
     },[page])

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
                    <button type='button' onClick={decrimentPage} className="decriment-btn carousel-btn">
                        &laquo;	
                    </button>
                    <button type='button' onClick={incrementPage} className="increment-btn carousel-btn">
                        &raquo;
                    </button>
                </div>
                <div className="button-wrapper">
                    <LinkButton link={'/Catalog'} text={'Catalog'}/>
                </div>
            </div>
        </div>
    )
}

export default HomeBestsellerSection