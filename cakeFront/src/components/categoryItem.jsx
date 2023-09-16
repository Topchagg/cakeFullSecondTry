import { Link } from 'react-router-dom'

import '../styles/default.css'
import '../styles/categoryItem.css'

function CategoryItem(props) {
    return (
        <Link to='/Catalog'>
        <div className="wrapper-category-item">
            <div className="img-wrapper">
                <img src={props.img}alt="" />
            </div>
            <div className="title-wrapper">
                {props.title}
            </div>
        </div>
        </Link>
    )
}

export default CategoryItem