import { Link } from 'react-router-dom'
import { useState } from 'react'

import { userAction } from '../store'

import Attention from '../components/attention.jsx'





function CategoryItem(props) {

    const [attention, setAttention] = useState(false)

    const isAdmin = userAction((state) => state.isAdmin)
    

    return (
        <div className="wrapper-category-item">
            <Link to={props.link}>
            <div className="img-wrapper">
                <img src={props.img} className='img' alt="" />
            </div>
            </Link>
            
            <div className="title-wrapper">
                <div className="title">{props.title}</div>
                {isAdmin &&  <><button className="delete-btn" onClick={() => (setAttention(!attention))}>Delete</button></>}
                {attention &&<><Attention decline={() => (setAttention(!attention))} id={props.id} img={props.img} message={"If u`ll click  you also delete all items that connected to this category! Are u sure?"} /></>}
            </div>
        </div>
    )
}

export default CategoryItem