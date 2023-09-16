import {Link} from 'react-router-dom'

import '../styles/layoutHeaderSection.css'
import About from '../pages/About'


function Header () {
    return (

        <header className="header">
            <div className="logo-wrapper">
                <Link to='/'><div className="logo">Dorty</div></Link>
            </div>
            <div className="nav-menu-wrapper">
                <Link to='About'><div className="nav-menu__item">About us</div></Link>
                <Link to='Catalog'><div className="nav-menu__item">Catalog</div></Link>
                <Link to='Delivery'><div className="nav-menu__item">Delivery</div></Link>
                <Link to='Contact'><div className="nav-menu__item">Contact us</div></Link>
            </div>
            <div className="icons-wrapper">
                <Link><img className='header__icon' src="carbon_search.svg" alt="" /></Link>
                <Link><img className='header__icon' src="heroicons_shopping-bag.svg" alt="" /></Link>
            </div>
        </header>

    )
}

export default Header