import { useEffect, useState } from 'react'

import Carousel from '../components/carouselBlock'

import {categoryItemFetch, tools, userAction} from '../store'
import CategoryItem from "../components/categoryItem"



function CategoriesWrapper () {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
 
    const [page, setPage] = useState(1)
    const [isCreating, setIsCreating]  = useState(false)
   
    const fixWrongPage = tools(state => (state.fixWrongPage))

    const categoryItems = categoryItemFetch(state => (state.categoryItems))
    const createObject = userAction(state => (state.createObject))  
    const isLoading = userAction(state => (state.isLoading))
    const loading = categoryItemFetch(state => (state.loading))
    const status = categoryItemFetch(state => (state.status))
    const fetchCategoryItems = categoryItemFetch((state) => state.fetchCategoryItems)

    useEffect(() => {
        fetchCategoryItems(page)
     },[page])

     useEffect(() => {
        fixWrongPage(page, setPage)
     },[status])

     function handleImage(e) {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
     }
     

    return (
        <>
           
            {isCreating || 
            <>
                <div className="categories-wrapper">
                {loading || categoryItems.map((categoryItem) => (
                    <CategoryItem  img={categoryItem.imgOfCategory}  id={categoryItem.pk} title={categoryItem.nameOfCategory} slug={categoryItem.slug} link={categoryItem.slug}  />
                ))}
                </div>
                <>
                <Carousel status={status} page={page} setPage={setPage} />
                <button className='update-btn create' onClick={() => (setIsCreating(!isCreating))}>Create new</button>
                </>
            </>}
            {isCreating && 
            <>  
                <div className="creating-form-wrapper">
                    {isLoading && <><h1>Please. Wait...</h1></>}
                    <form action="">
                        <div className="input-wrapper">
                            Name: <input className='input-form' placeholder='Write here' type="text" onChange={(e) => (setName(e.target.value))} />
                        </div>
                        <div className="input-wrapper">
                            Image: <input className='input-form'  type="file" onChange={handleImage} />
                        </div>
                    </form>
                    <button className='delete-btn' onClick={() => (setIsCreating(!isCreating))}>Decline</button>
                    <button className='update-btn' onClick={() => (createObject("category",name, image))}>Create</button>
                </div>
            </>}

        </>
    )
}

export default CategoriesWrapper




