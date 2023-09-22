import { useEffect, useState } from 'react'


import {categoryItemFetch} from '../store'
import '../styles/catalogCategoryWrapper.css'
import CategoryItem from "../components/categoryItem"

function CategoriesWrapper () {

    const fetchCategoryItems = categoryItemFetch(state => (state.fetchCategoryItems))
    const categoryItems = categoryItemFetch(state => (state.categoryItems))
    const loading = categoryItemFetch(state => (state.loading))
    const page = categoryItemFetch(state => (state.page))
    const increment = categoryItemFetch(state => (state.incrementPage))
    const decriment = categoryItemFetch(state => (state.decrimentPage))

    function incrementPage() {
        increment()
    }

    function decrimentPage() {
        decriment()
    }

    useEffect(() => {
        fetchCategoryItems('false')
        console.log(page)
    },[page])

    return (
        <>
           
            <div className="categories-wrapper">
                
                {loading || categoryItems.map((categoryItem) => (
                    <CategoryItem title={categoryItem.nameOfCategory}  />
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
             </div>

        </>
    )
}

export default CategoriesWrapper




