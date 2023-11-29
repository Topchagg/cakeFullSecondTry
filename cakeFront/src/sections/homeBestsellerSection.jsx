
import ProductItem from '../components/productItemShowcase'
// import LinkButton from '../components/linkButton'
import Carousel from '../components/carouselBlock'

import { forShowCaseFetch, tools, userAction } from '../store'
import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

function HomeBestsellerSection () {


    const [page, setPage] = useState(1)


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
                <div className="bestsellers-items-wrapper">
                <AnimatePresence>
                    {bestsellers.map((item) => (
                        <motion.div initial={{x:0, opacity:1}} animate={{x:0,opacity:1}} exit={{y:600, opacity:0}} className="product-wrapper"><ProductItem key={item.pk} id={item.pk} bestseller={item.BestsellerItem} img={item.imgOfItem} price={item.priceOfItem} name={item.nameOfItem} fullItem={item} description={item.descriptionOfItem} category={item.categoryOfItem} /></motion.div>          
                    ))}
                </AnimatePresence>
                </div>
            </div>
           <Carousel status={status} page={page} setPage={setPage}/> 
        </div>
    )
}

export default HomeBestsellerSection