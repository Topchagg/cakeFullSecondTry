import { useEffect, useState } from 'react'
import { categoryItemsSlice } from '../store'
import '../styles/homeCatalogSection.css'


import CategoryItem from '../components/categoryItem'

function HomeCatalogSection () {

    const FetchCategoryItems =  categoryItemsSlice((state) => state.FetchCategoryItems)
    const categoryItems =  categoryItemsSlice((state) => state.categoryItems)

    const [show, setShow] = useState(false)

    useEffect(() => {
        FetchCategoryItems('false')
    },[])

    return (
        <div className="home-catalog-section">
            <div className="large-text">Catalog</div>
            <div className="catalog-items-wrapper">
                { categoryItems.map((categoryItem) => (
                    <CategoryItem/>
                )) }
            </div>
        </div>
    )
}

export default HomeCatalogSection