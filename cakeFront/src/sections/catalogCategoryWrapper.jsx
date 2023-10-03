import { useEffect, useState } from 'react'

import Carousel from '../components/carouselBlock'

import {categoryItemFetch, tools} from '../store'
import CategoryItem from "../components/categoryItem"

import '../styles/catalogCategoryWrapper.css'

function CategoriesWrapper () {

    const [page, setPage] = useState(1)

   
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
                    <CategoryItem title={categoryItem.nameOfCategory} slug={categoryItem.slug}  />
                ))}
            </div>
            <Carousel status={status} page={page} setPage={setPage} />

        </>
    )
}

export default CategoriesWrapper




