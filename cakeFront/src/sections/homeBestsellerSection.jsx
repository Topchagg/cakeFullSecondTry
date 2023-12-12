
import ProductItem from '../components/productItemShowcase'
// import LinkButton from '../components/linkButton'
import Carousel from '../components/carouselBlock'

import { forShowCaseFetch, tools, userAction} from '../store'
import { useEffect, useState } from 'react'

function HomeBestsellerSection () {


    const [page, setPage] = useState(1)

    const fixWrongPage = tools(state => (state.fixWrongPage))

    const bestsellers = forShowCaseFetch(state => (state.bestsellers))
    const status = forShowCaseFetch(state => (state.status)) 
    const fetchBestsellersForShowcase = forShowCaseFetch(state => (state.fetchBestsellersForShowcase))
    const isAction = userAction(state => (state.isAction)) 



    useEffect(() => {
        fetchBestsellersForShowcase(page, 'false')
     },[page, isAction])

     useEffect(() => {
        fixWrongPage(page, setPage)
     },[status])

    return (
        <div className="home-bestseller-section">
            <div className="large-text">BESTSELLERS</div> 
            
            <div className="bestsellers-items-wrapper">
                <div className="bestsellers-items-wrapper">
                    {bestsellers.map((item) => (
                        <div className="product-wrapper"><ProductItem key={item.pk} id={item.pk} bestseller={item.BestsellerItem} img={item.imgOfItem} price={item.priceOfItem} name={item.nameOfItem} fullItem={item} description={item.descriptionOfItem} category={item.categoryOfItem} /></div>          
                    ))}
                </div>
            </div>
           <Carousel status={status} page={page} setPage={setPage}/> 
        </div>
    )
}

export default HomeBestsellerSection