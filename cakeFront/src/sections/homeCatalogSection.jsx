import { useEffect, useState } from 'react'
import { categoryItemFetch, userAction} from '../store'



import CategoryItem from '../components/categoryItem'

function HomeCatalogSection () {


    const fetchCategoryItems =  categoryItemFetch((state) => state.fetchCategoryItems)
    const categoryItems =  categoryItemFetch((state) => state.categoryItems)
    const isAction = userAction((state) => state.isAction)

    useEffect(() => {
        fetchCategoryItems(1,'true')
    },[isAction])

    

    return (
        <div className="home-catalog-section">
            <div className="large-text">Catalog</div>
            <div className="catalog-items-wrapper">
                { categoryItems.map((categoryItem) => (
                    <CategoryItem key={categoryItem.pk} id={categoryItem.pk} img={categoryItem.imgOfCategory} slug={categoryItem.slug} link={'Catalog/' + categoryItem.slug} title={categoryItem.nameOfCategory}/> 
                ))}
            </div>
        </div>
    )
}

export default HomeCatalogSection