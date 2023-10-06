import { Link } from 'react-router-dom'

import '../styles/default.css'
import '../styles/categoryItem.css'

import { tools } from '../store'

function CategoryItem(props) {

    setSlugOfCategory = tools((state) => state.setSlugOfCategory)

    return (
        <div className="wrapper-category-item">
            <Link to={props.link}>
            <div onClick={() => setSlugOfCategory(props.slug)} className="img-wrapper">
                <img src={props.img}alt="" />
            </div>
            </Link>
            
            <div className="title-wrapper">
                
                <div className="title">{props.title}</div>
            </div>
        </div>
    )
}

export default CategoryItem