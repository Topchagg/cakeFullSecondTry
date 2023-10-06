import { useEffect, useState } from 'react'


import {categoryItemFetch, tools} from '../store'
import '../styles/catalogCategoryWrapper.css'
import CategoryItem from "../components/categoryItem"

function CategoriesWrapper () {

    const [page, setPage] = useState(1)

    const incrementPage = tools(state => (state.incrementPage))
    const decrimentPage = tools (state => (state.decrimentPage))
    const fixWrongPage = tools(state => (state.fixWrongPage))

    const categoryItems = categoryItemFetch(state => (state.categoryItems))
    const loading = categoryItemFetch(state => (state.loading))
    const status = categoryItemFetch(state => (state.status))
    const fetchCategoryItems = categoryItemFetch((state) => state.fetchCategoryItems)

    useEffect(() => {
        fetchCategoryItems(page)
     },[page])

     useEffect(() => {
        fixWrongPage(page, setPage)
     },[status])

    return (
        <>
           
            <div className="categories-wrapper">
                
                {loading || categoryItems.map((categoryItem) => (
                    <CategoryItem title={categoryItem.nameOfCategory} slug={categoryItem.slug} link={categoryItem.slug}  />
                ))}
            </div>
            <div className="carousel-btn-wrapper">
            <div className="carousel-wrapper">
                     <button type='button' onClick={() => decrimentPage(page, setPage)} className="decriment-btn carousel-btn">
                         &laquo;	
                     </button>
                     <button type='button' onClick={() => incrementPage(page, setPage)}  className="increment-btn carousel-btn">
                         &raquo;
                     </button>
                 </div> 
             </div>
        </>
    )
}

export default CategoriesWrapper




