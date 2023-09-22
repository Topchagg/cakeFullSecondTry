import { useEffect, useState } from 'react'
import { categoryItemFetch } from '../store'
import '../styles/homeCatalogSection.css'


import CategoryItem from '../components/categoryItem'

function HomeCatalogSection () {

    const fetchCategoryItems =  categoryItemFetch((state) => state.fetchCategoryItems)
    const categoryItems =  categoryItemFetch((state) => state.categoryItems)

    const [show, setShow] = useState(false)

    useEffect(() => {
        fetchCategoryItems('false')
    },[])

    return (
        <div className="home-catalog-section">
            <div className="large-text">Catalog</div>
            <div className="catalog-items-wrapper">
                { categoryItems.map((categoryItem) => (
                    <CategoryItem slug={categoryItem.slug} title={categoryItem.nameOfCategory}  /> 
                )) }
            </div>
        </div>
    )
}

export default HomeCatalogSection