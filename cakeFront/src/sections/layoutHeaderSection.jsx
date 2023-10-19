import {Link} from 'react-router-dom'
import { useEffect } from 'react'

import { cart } from '../store'

import '../styles/layoutHeaderSection.css'

function Header () {

    const toggleShowCart = cart((state) => state.toggleShowCart)
    const Amount = cart((state) => state.Amount)
    const setLocalItemsData = cart((state) => state.setLocalItemsData)


    
    useEffect(() => {
        const parsedLocalItems = JSON.parse(localStorage.getItem("bigItems"))
        setLocalItemsData(parsedLocalItems)
        
    },[])


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
                <img className='header__icon' src="carbon_search.svg" alt="" />
                <img className='header__icon' src="heroicons_shopping-bag.svg" alt="" onClick={() => (toggleShowCart())}/>
                <div className="header__icon amount">
                    <div className="amount-num">{Amount}</div>
                </div>
            </div>
        </header>

    )
}

export default Header