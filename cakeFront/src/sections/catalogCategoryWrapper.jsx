import { useEffect, useState } from 'react'

import Carousel from '../components/carouselBlock'

import {categoryItemFetch, tools, userAction} from '../store'
import IsLoading from '../components/isLoading'
import CategoryItem from "../components/categoryItem"



function CategoriesWrapper () {

    const isAdmin = userAction(state => (state.isAdmin))

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
 
    const [page, setPage] = useState(1)
    const [isCreating, setIsCreating]  = useState(true)
   
    const fixWrongPage = tools(state => (state.fixWrongPage))

    const categoryItems = categoryItemFetch(state => (state.categoryItems))
    const createObject = userAction(state => (state.createObject))  
    const isLoading = userAction(state => (state.isLoading))
    const isAction = userAction((state) => state.isAction)
    const loading = categoryItemFetch(state => (state.loading))
    const status = categoryItemFetch(state => (state.status))
    const fetchCategoryItems = categoryItemFetch((state) => state.fetchCategoryItems)

    useEffect(() => {
        fetchCategoryItems(page)
     },[page])

     useEffect(() => {
        fixWrongPage(page, setPage)
     },[status])

     function imageHandler(e) {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    // useEffect(() => {
    //     fetchCategoryItems(page)
    //     setIsCreating(!isCreating)
    // },[isAction])

    return (
        <>
           
            {isCreating || 
            <>
                <div className="categories-wrapper">
                {loading || categoryItems.map((categoryItem) => (
                    <CategoryItem key={categoryItem.pk}  img={categoryItem.imgOfCategory}  id={categoryItem.pk} title={categoryItem.nameOfCategory} slug={categoryItem.slug} link={categoryItem.slug}  />
                ))}
                </div>
                <>
                <div className="catalog-carousel-wrapper"><Carousel status={status} page={page} setPage={setPage} /></div>
                {isAdmin && <><button className='update-btn create' onClick={() => (setIsCreating(!isCreating))}>Create new</button></>}
                </>
            </>}
            {isCreating && 
            <>
            {isLoading && <IsLoading/>}
            <div className='creating-category-wrapper'>
                <div className="category-form-wrapper">
                    <div className="input-file-btn">
                        <label className='upload-img' htmlFor="upload-img">
                            <div className="upload-img-btn-wrapper">
                                <div className="upload-img-text-wrapper">Upload photo</div>
                                <div className="upload-img-wrapper"><img src="/upload.png" alt="" /></div>
                            </div>
                        </label>
                        <input id="upload-img" className='input-file' onChange={imageHandler} type="file" />
                    </div>
                <div className="input-wrapper">
                    <input type="text" className='register-form-input' onChange={(e) => (setName(e.target.value))} placeholder='Name' />
                </div>
                </div>
                <div className="create-decline-buttons-wrapper">
                    <button className="create-item-button"  onClick={() => (setIsCreating(!isCreating))}>Decline</button>
                    <button className="create-item-button"  onClick={() => (createObject("category",name, image))}>Create</button>
                </div>
            </div>
            </>}

        </>
    )
}

export default CategoriesWrapper






