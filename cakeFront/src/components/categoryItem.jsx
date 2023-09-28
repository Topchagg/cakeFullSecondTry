import { Link } from 'react-router-dom'

import '../styles/default.css'
import '../styles/categoryItem.css'

function CategoryItem(props) {
    return (
        <div className="wrapper-category-item">
            <Link to={props.slug}>
            <div className="img-wrapper">
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