import '../styles/homeBestsellerSection.css'

import ProductItemShowcase from '../components/productItemShowcase.jsx'

function HomeBestsellerSection () {
    return (
        <div className="home-bestseller-section">
            <div className="large-text">BESTSELLERS</div> 
            <div className="bestsellers-items-wrapper">
            <ProductItemShowcase/>
            </div>
        </div>
    )
}

export default HomeBestsellerSection