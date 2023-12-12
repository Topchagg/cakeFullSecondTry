import { useState } from 'react'


import BestsellerLine from './bestsellerLine'
import AddButton from "./addButton"
import {Link} from 'react-router-dom'
import UpdateProductShow from './updateProductShow'
import { cart, userAction } from '../store'
import IsLoading from './isLoading'



import '/src/styles/productItemShowcase.css'

function ProductItem (props) {

    const [infoBestseller, setInfoBestseller] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [price, setPrice] = useState(props.price)
    const [name, setName] = useState(props.name)
    const [bestseller, setBestseller] = useState(props.bestseller)
    const [img, setImage] = useState(false)
    // const [description, setDescription] = useState(props.description)

    const addItemIntoCart = cart((state) => state.addItemIntoCart)
    const isAdmin = userAction((state) => state.isAdmin)
    const deleteObject = userAction((state) => state.deleteObject)
    const updateObject = userAction((state) => state.updateObject)
    const isLoading = userAction((state) => state.isLoading)

    async function  handleUpdateObject()  {
        await updateObject(props.id, "product",price,name,bestseller,img, props.img,'da',props.category)
        setIsUpdate(!isUpdate)
    }
    async function handleDeleteObject() {
        await deleteObject(props.id, "product", props.img)
    }

    function handleOnMouseUp() {
        setInfoBestseller(!infoBestseller)
    }

    function handleOnMouseDown() {
        setInfoBestseller(!infoBestseller)
    }

    function handleImage(e) {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
     }

    return (
        <div className="product-item-wrapper">
            {isLoading && <IsLoading/>}
            <div className="product-img-wrapper">
               {isUpdate || <><div className="star-wrapper">{props.bestseller && <img  onMouseEnter={handleOnMouseUp} onMouseLeave={handleOnMouseDown} className='star' src="yellow-star.png" alt=""/>}{infoBestseller && <BestsellerLine/>}</div></>}
                {isUpdate || <><Link to={props.slug}><img className='product-img-wrapper' src={props.img} alt="" /></Link></>}
                {isUpdate && 
                    <UpdateProductShow name={props.name} price={props.price} bestseller={bestseller}  setNameFunc={setName} setPriceFunc={setPrice} setBestsellerFunc={setBestseller} handleImage={handleImage} />
                    }
            </div>
            <div className="product-data-wrapper">
                <div className="name-of-product-wrapper">
                    <div className="name-of-product">
                        {isUpdate || <>{props.name}</>}
                    </div>
                </div>
                <div className="add-button-n-price-wrapper">
                    <div className="price-of-item">
                        {isUpdate || <>{props.price} $ </>}
                    </div>
                    <div className="add-btn">
                       {isUpdate || <AddButton fullItem={props.fullItem} func={addItemIntoCart} />}
                    </div>
                </div>
            </div>
           {isUpdate ||
            <>
            {isAdmin &&   
            <div className='buttons-wrapper'>
                <button onClick={() => {handleDeleteObject()}} className='logout-btn'>Delete</button>
                <button className='logout-btn' onClick={() => (setIsUpdate(!isUpdate))}>Update</button>
            </div>}
            </>}
            {isUpdate && <div className='buttons-wrapper'>
                <button onClick={() => (handleUpdateObject())} className='logout-btn'>Commit</button> 
                <button className='logout-btn' onClick={() => (setIsUpdate(!isUpdate))} >Deciline</button>
            </div>}
        </div>
    )
}

export default ProductItem

// <div className='update-form-wrapper'>
                   
                    // </div>