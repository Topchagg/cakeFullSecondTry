import { useState } from 'react'


import BestsellerLine from './bestsellerLine'
import AddButton from "./addButton"

import { cart, userAction } from '../store'

import '../styles/ProductItemShowcase.css'

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
            <div className="product-img-wrapper">
               {isUpdate || <><div className="star-wrapper">{props.bestseller && <img  onMouseEnter={handleOnMouseUp} onMouseLeave={handleOnMouseDown} className='star' src="yellow-star.png" alt=""/>}{infoBestseller && <BestsellerLine/>}</div></>}
                {isUpdate || <><img src={props.img} alt="" /></>}
                {isUpdate && 
                    <div className='update-form-wrapper'>
                        <form className='update-form' action="">
                            <div className="input-wrapper">
                                <label htmlFor="">Name: </label>
                                <input onChange={(e) => (setName(e.target.value))} className='form-input' type="text" defaultValue={props.name} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="">Price: </label>
                                <input onChange={(e) => (setPrice(e.target.value))} className='form-input' type="number" defaultValue={props.price} />
                              </div>
                            <div className="input-wrapper">
                                <label htmlFor="">Bestseller: </label>
                                <input onClick={(e) => (setBestseller(!bestseller))} className='form-input' type="checkbox" checked={bestseller} />
                            </div>
                            <div className="input-wrapper">
                                Image: <input className='input-form'  type="file" onChange={handleImage} />
                            </div>
                        </form>
                    </div>
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
            {isAdmin &&   <><button onClick={() => {deleteObject(props.id, "product", props.img )}} className='delete-btn'>Delete</button><button className='update-btn' onClick={() => (setIsUpdate(!isUpdate))}>Update</button></>}</>}
            {isUpdate && <><button onClick={() => (updateObject(props.id, "product",price,name,bestseller,img, props.img,'da',props.category))} 
            className='update-btn'>Commit</button> <button className='delete-btn' onClick={() => (setIsUpdate(!isUpdate))} >Deciline</button>
            {isLoading && <>Loading please. wait...</>}
            </>}
        </div>
    )
}

export default ProductItem